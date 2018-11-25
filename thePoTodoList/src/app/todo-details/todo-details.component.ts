import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../model/todo';
import { Get } from '../store/actions';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

	public todoSelected: Todo;
	public todoList: Observable<Todo[]>;
	public todoId: number;

  constructor(
  	private route: ActivatedRoute,
  	private store: Store<{todos: Todo[]}>,
  	private router: Router
  )
  {
    this.route.params.subscribe( params => {
    	this.todoId = params.id;
    });
    this.todoList = store.select(state => state.todos);
  }

  ngOnInit() {
  	this.todoList.subscribe(todos => {
  		this.todoSelected = todos.find(todo => {
  			return todo.id == this.todoId;
  		})
  	})
  	this.store.dispatch(new Get());
  }

  public backToList(): void {
  	this.router.navigate(['/list']);
  }

}
