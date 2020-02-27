import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Todos } from '../../../../interfaces/todos';
import { Note } from '../../../../interfaces/note';
import { Todo } from '../../../../class/todo';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['id',  'text', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		public api: ApiService,
		public dialog: MatDialog
	) { 
	}

	ngOnInit(): void {
		this.onGetData();
	}

	onGetData(){
		this.api.getTodosAll().subscribe(
			(data) =>{
				let database: any = data;
				this.dataSource = new MatTableDataSource<Todo>(database.data );
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(error) =>{
				console.error(error);
			}
		);
	}

	// get filters() {
	// 	return this.api.filter;
	// }

	toggleDoneID(id: any, note: Todos) {
		let key : number = Number(id);
		note.done = note.done === 0 ? 1:0;
		this.api.updateTodoByID(key, note).subscribe(
			(data) => { this.onGetData();},
			(error) => { console.error(error)}
		);
	}

	toggleImportantID(id: any, note: Todos) {
		note.important = note.important === 0 ? 1:0;
		this.api.updateTodoByID(Number(id), note).subscribe(
			(data) => { this.onGetData(); },
			(error) => { console.error(error)}
		);
	}
	
	onDeleteID(id: any) {
		this.api.deleteTodoByID(Number(id)).subscribe(
			(data) => { this.onGetData(); },
			(error) => { console.error(error)}
		);
	}

}
