import React, { Component } from 'react';
import './App.css';
import TodoItem from './TodoItems.js';
import Footer from './Footer.js'

const ENTER_KEY = 13;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      newTodo: ''
    }
    this.handleOnTextEnter = this.handleOnTextEnter.bind(this);
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
    this.handleOnClearCompleted = this.handleOnClearCompleted.bind(this);
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

  handleOnClearCompleted(){
    this.props.model.clearCompleted();
  }

  toggle(todoToToggle){
    this.props.model.toggle(todoToToggle);
  }

  delete(todo){
    this.props.model.delete(todo);
  }

  render() {
    var that = this;

    var allTodos = this.props.model.todos;

    var activeTodoCount = allTodos.reduce(function(accum, todo){
        return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = allTodos.length - activeTodoCount;

    var todoItems = allTodos.map(function(todo){
      return (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDelete={that.delete.bind(that, todo)} 
          onToggle={that.toggle.bind(that, todo)}
          />
      );
    });

    var footer = (
        <Footer completedCount={completedCount}
                todoCount={activeTodoCount} 
                onClearCompleted={this.handleOnClearCompleted}
                />
      );

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
        {footer}
      </div>
    );
  }
}

export default App;
