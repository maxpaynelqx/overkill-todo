import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../store/reducer';

import { TodoListComponent } from './todo-list.component';
import { Todo } from '../model/todo';
import { Create, Update, Delete } from '../store/actions';
import stubJson from '../../assets/todoList_stub.json';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<{todos: Todo[]}>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [
        StoreModule.forRoot({ todos: reducer }),
        MatCardModule,
        MatCheckboxModule
      ]
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
    spyOn(store, 'dispatch').and.callThrough();
    const todo = {
      "id": 12,
      "title": "Test",
      "done": true
    };
    const action = new Update(todo);
    component.todoDone(todo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
