import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import './index.css';

var app = app || {};

(function(){
	'use strict';

	app.utils = {
		store: function(namespace, data){
			if(data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [] ;
		},
		extend: function() {
			var newObj = {};
			for(var i = 0; i < arguments.length; i++){
				var obj = arguments[i];
				for(var key in obj){
					if(obj.hasOwnProperty(key)){
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		},
	};

	var Utils = app.utils;

	app.model = function(key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.model.prototype.subscribe = function(onChange){
		this.onChanges.push(onChange);
	};

	app.model.prototype.refresh = function() {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function(cb){ cb(); });
	};

	app.model.prototype.addTodo = function(title) {
		this.todos = this.todos.concat({
			id: Date.now(),
			title: title,
			completed: false
		});
		this.refresh();
	};

	app.model.prototype.toggle = function(todoToToggle){
		this.todos = this.todos.map(function(todo){
			return todo !== todoToToggle ? 
					todo : 
					Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.refresh();
	};

	app.model.prototype.delete = function(todo){
		this.todos = this.todos.filter(function(candidate){
			return candidate !== todo;
		});

		this.refresh();
	};

	app.model.prototype.clearCompleted = function(){
		this.todos = this.todos.filter(function(todo){
			return !todo.completed;
		});

		this.refresh();
	};

	var model = new app.model('todo-items');

	function render() {
		return ReactDOM.render(
		  <App model={model} />,
		  document.getElementById('root')
		);
	}

	model.subscribe(render);
	render();

})();