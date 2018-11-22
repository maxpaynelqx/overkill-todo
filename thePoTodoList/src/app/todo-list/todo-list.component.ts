import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../model/todo';
import { Create, Update, Delete } from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList: Observable<Todo[]>;

  constructor(private store: Store<Todo[]>) {
    this.todoList = store.pipe(select('todos'));
    console.log(this.todoList)
  }

  public add(todo: Todo) {
    this.store.dispatch(new Create(todo));
  }

  public update(todo: Todo) {
    this.store.dispatch(new Update(todo));
  }

  public delete(todo: Todo) {
    this.store.dispatch(new Delete(todo));
  }

  ngOnInit() {
  }

}
