import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [{
    path: 'list',
    component: TodoListComponent
}, {
	path: 'details/:id',
	component: TodoDetailsComponent
}, { 
	path: '',
    redirectTo: '/list', 
    pathMatch: 'full' 
}, { 
	path: '**', 
	component: PageNotFoundComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
