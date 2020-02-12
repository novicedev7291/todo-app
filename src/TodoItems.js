import React, {Component} from 'react';
import './App.css';

class TodoItem extends Component{
	render() {
		return (
			<li>
				<input type="checkbox" checked={this.props.todo.completed} />
				<label>{this.props.todo.title}</label>
				<button className="delete"></button>
			</li>
		);
	}
}

export default TodoItem;