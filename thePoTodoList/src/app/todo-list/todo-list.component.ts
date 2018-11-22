import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../model/todo';
import { Create, Update, Delete } from '../store/actions';
import stubJson from '../../assets/todoList_stub.json';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList: Observable<Todo[]>;

  constructor(private store: Store<{todos: Todo[]}>) {
    this.todoList = store.select(state => state.todos);
  }

  ngOnInit() {
  	stubJson.todos.forEach(todo => {
	  	this.add(todo);
  	})
  }

  public todoDone(todo: Todo): void {
  	this.update(todo);
  }

  private add(todo: Todo): void {
    this.store.dispatch(new Create(todo));
  }

  private update(todo: Todo): void {
    this.store.dispatch(new Update(todo));
  }

  private delete(todo: Todo): void {
    this.store.dispatch(new Delete(todo));
  }
}
