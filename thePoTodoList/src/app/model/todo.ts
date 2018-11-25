export class Todo {
  id: number;
  title: string;
  done: boolean;
  details: string;

  constructor() {
    this.title = '';
    this.details = '';
    this.done = false;
  }
}