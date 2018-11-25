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

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;
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

    fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to list when back is clicked', fakeAsync(() => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.backToList();
    expect(navigateSpy).toHaveBeenCalledWith(['/list']);
  }));

  it('should navigate to list and delete todo when delete is clicked', fakeAsync(() => {
    let storeSpy = spyOn(store, 'dispatch');
    component.todoSelected = {
      "id": 12,
      "title": "Test",
      "done": true,
      "details": "Lorem ipsum."
    };
    const action = new Delete(component.todoSelected);
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.deleteTodo();
    expect(storeSpy).toHaveBeenCalledWith(action);
    expect(navigateSpy).toHaveBeenCalledWith(['/list']);
  }));
});
