var axios = require('axios');

//Export object(s) from this file (for interaction with external APIs)
module.exports = {
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