import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../store/reducer';

import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { Todo } from '../model/todo';
import { Create, Update, Delete, Get } from '../store/actions';
import stubJson from '../../assets/todoList_stub.json';
import { routes } from '../app-routing.module';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<{todos: Todo[]}>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TodoListComponent,
        TodoDetailsComponent,
        PageNotFoundComponent
      ],
      imports: [
        StoreModule.forRoot({ todos: reducer }),
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init Todo List', () => {
    component.todoList.subscribe(data => {
      expect(data.length).toBe(stubJson.todos.length);
    });
  });

  it('should update todo', () => {
    let storeSpy = spyOn(store, 'dispatch');
    const todo = {
      "id": 12,
      "title": "Test",
      "done": true,
      "details": "Lorem ipsum."
    };
    const action = new Update(todo);
    component.todoDone(todo);
    expect(storeSpy).toHaveBeenCalledWith(action);
  });

  it('should navigate to details when a todo is selected', fakeAsync(() => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    const todo = {
      "id": 12,
      "title": "Test",
      "done": true,
      "details": "Lorem ipsum."
    }; 
    component.showTodo(todo);
    expect(navigateSpy).toHaveBeenCalledWith(['/details/12']);
  }));

  it('should change creation form display status', () => {
    let initialState = component.showNewForm;
    component.toggleFormDisplay();
    expect(component.showNewForm).toBe(!initialState);
  });

  it('should create todo when form is ok', () => {
    let storeSpy = spyOn(store, 'dispatch');
    component.newTodoItem = {
      "id": 12,
      "title": "Test",
      "done": true,
      "details": "Lorem ipsum."
    };
    const action = new Create(component.newTodoItem);
    component.saveNewTodo();
    expect(storeSpy).toHaveBeenCalledWith(action);
  });

  it('should create todo when title is not filled', () => {
    let storeSpy = spyOn(store, 'dispatch');
    component.newTodoItem = {
      "id": 12,
      "title": "",
      "done": true,
      "details": "Lorem ipsum."
    };
    component.saveNewTodo();
    expect(storeSpy).not.toHaveBeenCalled();
  });

});
