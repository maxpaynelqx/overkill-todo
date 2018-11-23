import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../model/todo';
import { Create, Update, Delete, Get } from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList: Observable<Todo[]>;

  constructor(
  	private store: Store<{todos: Todo[]}>,
  	private router: Router
  ) 
  {
    this.todoList = store.select(state => state.todos);
  }

  ngOnInit() {
  	this.store.dispatch(new Get());
  }

  public todoDone(todo: Todo): void {
  	todo.done = !todo.done;
  	this.update(todo);
  }

  public showTodo(todo: Todo): void {
  	this.router.navigate(['/details/'+ todo.id]);
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
