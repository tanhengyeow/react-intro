var React = require('react');
var Popular = require('./Popular');

//Create a modern react component (can have states, lifecycle event, *UI*)
class App extends React.Component {

	//Whatever render method returns is the specific UI for this component
	//JSX syntax > webpack bundle, babel transform > transpiled into React.createElement invocations similiar to javascript
	render() {
		return (
			<div className='container'> 
				<Popular />
			</div>
		)
	}
}

module.exports = App;