import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import TodoItem from './TodoItems.js';

const ENTER_KEY = 13;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      newTodo: ''
    }
    this.handleOnTextEnter = this.handleOnTextEnter.bind(this);
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
  }

  handleOnTextChange(e) {
    this.setState({
      newTodo: e.target.value
    });
    e.preventDefault();
  }
  
  handleOnTextEnter(e) {
    if(e.keyCode !== ENTER_KEY) return;
    e.preventDefault();
    var val = this.state.newTodo.trim();
    if(val) {
      this.props.model.addTodo(val);
      this.setState({
        newTodo: ''
      });
    }
  }

  render() {
    var todoItems = this.props.model.todos.map(function(todo){
      return (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          />
      );
    }); 

    return (
      <div className="todoapp">
        <header>
          <h1>todos</h1>
          <input 
                  value={this.state.newTodo}  
                  onChange={this.handleOnTextChange}
                  onKeyDown={this.handleOnTextEnter} 
                  className="new-todo" 
                  placeholder="What needs to be done?"
                  autoFocus={true}
                    />
        </header>
        <section>
          <ul>
            {todoItems}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
