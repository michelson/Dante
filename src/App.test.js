import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Demo from './demo.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App content={Demo}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
