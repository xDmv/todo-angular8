import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './pages/todo/todo.component';

const routes: Routes = [
	{
		path: '', 
		redirectTo: '/notes', 
		pathMatch:'full'
		},
		{
			path: 'notes',
			component: TodoComponent
	  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
