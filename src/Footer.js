import React, {Component} from 'react';
import './App.css';

class Footer extends Component {
	constructor(props){
		super(props);
		this.onClearCompleted = this.onClearCompleted.bind(this);
	}

	onClearCompleted(e) {
		this.props.onClearCompleted();
		e.preventDefault();
	}

	render() {
		var clearButton = null;
		if(this.props.completedCount > 0){
			clearButton = (
					<button className="clear-button" onClick={this.onClearCompleted} >Clear Completed</button>
				);
		}
		return (
			<footer>
				<span>
					<strong>{this.props.todoCount}</strong> Items left
				</span>
				{clearButton}
			</footer>
		);
	}
}

export default Footer;