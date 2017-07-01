var React = require('react');
var PropTypes = require('prop-types');

//Stateless functional component (function that is rendering/returning some UI)
function SelectLanguage (props) {

	var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

	//.map allows you to take in a second argument to specifcy the context you are in
	//second argument in this.updateLanguage passes in other arguments to the updateLanguage function
	return (
		<ul className='languages'>
			{languages.map(function (lang) {
				return (
					<li 
						style={lang===props.selectedLanguage ? {color: '#d0021b'} : null}
						onClick={props.onSelect.bind(null,lang)}
						key={lang}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
	//Set up the default state when the Popular component is invoked
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};

							  //ensures that the 'this' keyword in updateLanguage is always the component instance (has the .setState property)
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	//function to update the state of the component
	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang
			}
		})

	}

	//UI for the component
	render() {

		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
			</div>

		)
	}
}

module.exports = Popular;