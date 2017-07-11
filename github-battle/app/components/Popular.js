var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

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

						//this keyword already bound, so first parameter is null
						onClick={props.onSelect.bind(null,lang)}
						key={lang}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

function RepoGrid (props) {
 return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
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
			selectedLanguage: 'All',
			repos: null
		};

							  //ensures that the 'this' keyword in updateLanguage is always the component instance (has the .setState property)
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	//Invoked whenever component mounts to the screen
	componentDidMount () {
	//AJAX requests
		this.updateLanguage(this.state.selectedLanguage);
	}

	//function to update the state of the component
	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		//fetch all popular repos from github
		api.fetchPopularRepos(lang)
			//triggers when gets response from function call
			.then(function (repos) {
				//triggers a rerender base on new state
				this.setState(function () {
					return {
						repos: repos
					}
				})
			}.bind(this));

	}

	//UI for the component
	render() {

		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos
					? <p>LOADING</p>
					: <RepoGrid repos={this.state.repos} />}
			</div>

		)
	}
}

module.exports = Popular;