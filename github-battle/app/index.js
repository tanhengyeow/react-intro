var React = require('react');
var ReactDOM = require('react-dom'); //render react component with the dom

require('./index.css'); //all the css in index.css included inside the application when webpack bundles up everything

var App = require('./components/App');
ReactDOM.render(<App />, document.getElementById('app'));
