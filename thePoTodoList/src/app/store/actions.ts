import { Action } from '@ngrx/store';

import { Todo } from '../model/todo';

export enum ActionTypes {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
}

export class Create implements Action {
  readonly type = ActionTypes.Create;
  constructor(public payload: Todo) {}
}

export class Update implements Action {
  readonly type = ActionTypes.Update;
  constructor(public payload: Todo) {}
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: Todo) {}
}

export type TodosActions = Create | Update | Delete;