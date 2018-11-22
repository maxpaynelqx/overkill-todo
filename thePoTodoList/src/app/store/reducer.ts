import { ActionTypes, TodosActions } from './actions';
import { Todo } from '../model/todo';

export const initialState = [];

export function reducer(state: Todo[] = initialState, action: TodosActions) {
  switch (action.type) {
    case ActionTypes.Create:
      return [
        ...state,
        action.payload
      ];

    case ActionTypes.Update:
      let newState = state.map(todo => {
        if(todo.id !== action.payload.id){
          return todo;
        }
        return Object.assign({}, todo, {
           done: !todo.done
        });
      });
      const index = newState.findIndex(todo => {
        return todo.id === action.payload.id;
      });
      if (newState[index].done) {
        const todo = newState.splice(index, 1);
        newState.push(todo[0]);
      } else {
        const todo = newState.splice(index, 1);
        newState.unshift(todo[0]);
      }
      return newState;

    case ActionTypes.Delete:
      return state.filter(todo => todo.id !== action.payload.id);

    default:
      return ;
  }
}