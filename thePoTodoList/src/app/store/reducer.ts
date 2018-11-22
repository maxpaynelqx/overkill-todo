import { ActionTypes, TodosActions } from './actions';
import { Todo } from '../model/todo';
import stubJson from '../../assets/todoList_stub.json';

export const initialState = stubJson;

export function reducer(state: Todo[] = initialState, action: TodosActions) {
  switch (action.type) {
    case ActionTypes.Create:
      return [
        ...state,
        action.payload
      ];

    case ActionTypes.Update:
      return state.map(todo => {
        if(todo.id !== action.payload){
          return todo;
        }
        return Object.assign({}, todo, {
           done: !todo.done
        });
      });

    case ActionTypes.Delete:
      return state.filter(todo => todo.id !== action.payload);

    default:
      return ;
  }
}