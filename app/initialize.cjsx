ReactDOM = require('react-dom');
React = require('react');

Dante = require('./components/App.cjsx')

document.addEventListener 'DOMContentLoaded', ()->
  editor = new Dante
  editor.render()
  window.dante_editor = editor 

