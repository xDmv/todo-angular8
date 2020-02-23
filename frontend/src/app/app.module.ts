import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoListComponent } from './pages/todo/components/todo-list/todo-list.component';
import { TodoSearchComponent } from './pages/todo/components/todo-search/todo-search.component';
import { TodoFilterComponent } from './pages/todo/components/todo-filter/todo-filter.component';
import { TodoAddComponent } from './pages/todo/components/todo-add/todo-add.component';
import { TodoListItemComponent } from './pages/todo/components/todo-list-item/todo-list-item.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    TodoSearchComponent,
    TodoFilterComponent,
    TodoAddComponent,
    TodoListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
