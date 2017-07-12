var React = require('react');
var PropTypes = require('prop-types');

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}

class Loading extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text: props.text
		};

	}

	componentDidMount() {
		var stopper = this.props.text + "...";
		//run a function every x ms
		this.interval = window.setInterval(function () {
			if (this.state.text === stopper) {
				//reset to initial text if text equals stopper
				this.setState(function () {
					return {
						text: this.props.text
					}
				})
			}

			//else append a dot to the text of prev state
			else {
				this.setState(function (prevState) {
					return {
						text: prevState.text + '.'
					}
				});
			}

		}.bind(this),this.props.speed)
	}

	//clear interval once component unmounts
	componentWillUnmount () {
		window.clearInterval(this.interval);
	}

	render() {

		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)

	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}

module.exports = Loading;