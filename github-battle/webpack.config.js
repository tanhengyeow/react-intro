var path = require('path'); //utilities that work with file dir
var HtmlWebpackPlugin = require('html-webpack-plugin'); //create template html file and put it in dist folder, include a script that ref index_bundle.js

module.exports = {

	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'), //resolve to github-battle/dist
		filename: 'index_bundle.js' // bundle the code into this file and put it inside dir
	},

	//specify the actual loader/transformation to make to our code
	module: {

		//the loaders and transformations that we want to make
		rules: [

			//used on any file that has .js extension
			//babel is a code transformer, transpiles new class syntax in react component to older javascript
			//look inside package.json for a babel property
			// "env transpiles to ver of javascript that browser can understand"
  			// "react transpiles jsx to createElement invocs" 
			{ test: /\.(js)$/, use: 'babel-loader'},

			//used on any file that has .css extension
			//css-loader takes in any css files, anytime it sees an import or url('') > require statements
			//style-loader takes css and inserts in the page that the style is active
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader']} 

		]
	},	

	plugins: [new HtmlWebpackPlugin({

		template: 'app/index.html'
	})]
};
