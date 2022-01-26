import React, { Component } from 'react';
import 'isomorphic-fetch'; //We need this statement to use the Fetch API. You will also need to install isomorphic-fetch ('npm install --save isomorphic-fetch es6-promise') for
//this code to work when you write your own code with the Fetch API. This was already done when you 'npm install'ed this project
import './App.css';

// The APIs key and url is saved within a variable
const api = {
    key: process.env.REACT_APP_OPENWEATHERMAP_API_KEY, // End server session before using key. Because the env. file wont be read.
    base: "https://api.openweathermap.org/data/2.5/" //URL
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
            query: 'Barcelona',
            isLoaded: false,
            error: null,
        };
        this.queryChange = this.queryChange.bind(this); //Binding queryChange
        this.searchTemp = this.searchTemp.bind(this); //Binding searchTemp.
    }

    //queryChange updates the state of query once a user clicks the button.
    queryChange(e){
       this.setState({query: e.target.value})
    }
    
    //searchTemp fetches the data requested from the user and converts it to a JSON object.
    //Then the result updates our state. This will then give the user the requested data.
    searchTemp() {
      fetch(`${api.base}weather?q=${this.state.query}&units=metric&appid=${api.key}`)
            .then(res => res.json()) 
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        weather: result,
                        query: ''
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }
    
    //componentDidMount calls the searchTemp method(after render(once)).
    componentDidMount() {
      this.searchTemp();    
    }

    render() {
     // Information below produces the day, date, month and year with built in JS methods.
     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     const d = new Date();
     const day = d.getDay();
     const currday = days[day];
     const date = d.getDate();
     const month = d.getMonth();
     const currmonth = months[month];
     const year = d.getFullYear();
     
     // All state stored in variables with the same name as the orignal state.
     const { error, isLoaded, weather, query } = this.state;
     if (error) { // If error, return error message.
         return <div>Error: {error.message}</div>;
     } else if (!isLoaded) { // If isLoaded = falsse, return loading message.
         return <div>Loading...</div>;
     } else {
         return (
            <div className='app'>
            <main>

              {(weather.cod !== "404") ? ( // if cod is not === '404' execute code. 
              <div>
                <div className="locbox">
                  <div className="location"><b>{weather.name}, {weather.sys.country}</b></div>
                  <div className="date"><b>{currday} {date} {currmonth} {year}</b></div>
                </div>
                <div className="weatherbox">
                  <div >
                    <label className="temp">{Math.round(weather.main.temp)}°C</label>
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
              ) : (<div>{weather.message}</div>)}

              <div className="searchbox">
                <input 
                  type="text"
                  className="search"
                  placeholder="Search..."
                  onChange={this.queryChange} /* Onchange event triggers queryChange method. */
                  value={query}
                />
                <button onClick={this.searchTemp}>Search</button> {/* Onclick event triggers searchTemp method. */}
              </div>
            </main>
          </div>
         );
     }
 }
 }


 export default App; // Export App component.