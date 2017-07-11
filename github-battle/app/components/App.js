var React = require('react');
var Popular = require('./Popular');

var ReactRouter = require('react-router-dom');
//Few properties that we need from ReactRouter
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch; //only renders valid routes one at a time

var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

//Create a modern react component (can have states, lifecycle event, *UI*)
class App extends React.Component {

	//Whatever render method returns is the specific UI for this component
	//JSX syntax > webpack bundle, babel transform > transpiled into React.createElement invocations similiar to javascript
	//<Route /> is rendering a route component. 2 props: the path and the component to be shown in UI
	render() {
		return (
			<Router>
			<div className='container'> 
				<Nav/>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/battle' component={Battle}/>
					<Route path='/battle/results' component={Results}/>
					<Route path='/popular' component={Popular}/>
					<Route render={function () {
						return <p>Not found</p>
					}} />
				</Switch>
			</div>
			</Router>

		)
	}
}

module.exports = App;