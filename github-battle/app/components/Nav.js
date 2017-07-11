var React = require('react');

//these are required to create an anchor tab
var Link = require('react-router-dom').Link; //foundation to create an anchor tag
var NavLink = require('react-router-dom').NavLink; // extra properties on top of Link to dynamically change the style of anchor tag if the route is active

//Stateless functional component bcos this component has no states/lifecycle events
function Nav () {
	return (
		<ul className = 'nav'>
			<li>
				<NavLink exact activeClassName='active' to='/'>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/battle'>
					Battle
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/popular'>
					Popular
				</NavLink>
			</li>			
		</ul>
	)
}

module.exports = Nav;