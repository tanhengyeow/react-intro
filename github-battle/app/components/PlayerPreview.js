var React = require('react'); //JSX has a dependency on react
var PropTypes = require('prop-types');

function PlayerPreview (props) {

	//users onReset.bind to return a new function
	return (
		<div>
			<div className='column'>
				<img
					className='avatar'
					src={props.avatar}
					alt={'Avatar for ' + props.username}
				/>
				<h2 className='username'>@{props.username}</h2>
			</div>
			{props.children}
		</div>
	)
}

PlayerPreview.PropTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;