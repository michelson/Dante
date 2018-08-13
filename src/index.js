
//import material from 'material-design-lite/material.min.css'
//import material.min.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
//const div = document.createElement('div');
//ReactDOM.render(<App content={Demo}/>, div);
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();