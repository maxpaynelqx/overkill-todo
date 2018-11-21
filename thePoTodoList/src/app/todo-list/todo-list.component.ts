import { Component, OnInit } from '@angular/core';

import stubJson from '../../assets/todoList_stub.json';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	public todoList: Todo[];

  constructor() {
  }

  ngOnInit() {
  	this.todoList = stubJson;
  }

}
