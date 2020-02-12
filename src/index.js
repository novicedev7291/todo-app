import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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