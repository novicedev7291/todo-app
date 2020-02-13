import React, {Component} from 'react';
import './App.css';

class TodoItem extends Component{
	render() {
		return (
			<li>
				<input type="checkbox" checked={this.props.todo.completed} onChange={this.props.onToggle} />
				<label>{this.props.todo.title}</label>
				<button className="delete" onClick={this.props.onDelete}></button>
			</li>
		);
	}
}

export default TodoItem;