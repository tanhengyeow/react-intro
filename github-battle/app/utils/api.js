var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";

var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {

	//make a get request to the specified url by taking in a username
	//axios returns a promise > returning an object with .then property
	return axios.get('https://api.github.com/users/' + username + params)
		//function is passed the user variable (information returned by the github api)
		.then(function (user) {
			return user.data;
		});
}

function getRepos(username) {
	//returns a promise when resolved gives us 100 of user's repo
	return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStarCount (repos) {

	//take repos.data > reduce to a single number
	//count's starting number is zero, repo is the first item in repos.data on the first iteration
	return repos.data.reduce(function (count, repo) {
		//iterate the value of count in each repo item and append 
		return count + repo.stargazers_count;
	}, 0)
}

function calculateScore (profile, repos) {
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	return (followers *3) + totalStars;
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getUserData (player) {
	//takes in array of promises and call .then after everything resolves
	return axios.all([
		//asynchronously call these 2 functions and passing them both `player`
		getProfile(player),
		getRepos(player)
	]).then(function (data) {
		var profile = data[0];
		var repos = data[1];

		//object with following properties
		return {
			profile : profile,
			score: calculateScore(profile,repos)
		}
	})
}

function sortPlayers(players) {
	return players.sort( function (a,b) {
		return b.score - a.score;
	});
}

//Export object(s) from this file (for interaction with external APIs)
module.exports = {

	battle: function (players) {
		//mapp over players and get a new array > each item in array is what function getUserData returns (an object with a profile and a score property)
		//each item is returned as a promise
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	},

	fetchPopularRepos: function(language) {
		//stores an encoded URI that can be passed through the web
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		
		//returns a promise after requesting data from github API
		return axios.get(encodedURI)
			//function is invoked when request to github api is resolved and finished (passed a response parameter)
			.then(function (response) {
				return response.data.items;
			})	

	}
}