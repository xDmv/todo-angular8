import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoListComponent } from './pages/todo/components/todo-list/todo-list.component';
import { TodoSearchComponent } from './pages/todo/components/todo-search/todo-search.component';
import { TodoFilterComponent } from './pages/todo/components/todo-filter/todo-filter.component';
import { TodoAddComponent } from './pages/todo/components/todo-add/todo-add.component';
import { TodoListItemComponent } from './pages/todo/components/todo-list-item/todo-list-item.component';
import { TodoClearComponent } from './pages/todo/components/todo-clear/todo-clear.component';
import { FooterComponent } from './pages/todo/components/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonToggleModule, MatInputModule } from '@angular/material';


@NgModule({
	declarations: [
		AppComponent,
		TodoComponent,
		TodoListComponent,
		TodoSearchComponent,
		TodoFilterComponent,
		TodoAddComponent,
		TodoListItemComponent,
		FooterComponent,
		TodoClearComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatIconModule,
		MatDialogModule,
		MatPaginatorModule,
		MatTableModule,
		MatSortModule,
		MatFormFieldModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatInputModule
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
