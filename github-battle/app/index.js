var React = require('react');
var ReactDOM = require('react-dom'); //render react component with the dom

require('./index.css'); //all the css in index.css included inside the application when webpack bundles up everything

//Create a modern react component (can have states, lifecycle event, *UI*)
class App extends React.Component {

	//Whatever render method returns is the specific UI for this component
	//JSX syntax > webpack bundle, babel transform > transpiled into React.createElement invocations similiar to javascript
	render() {
		return (
			<div>Hello World!</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'));