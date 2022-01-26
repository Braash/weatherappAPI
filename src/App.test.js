import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer'

it('renders without crashing', () => {

  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
  /*const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);*/
});
