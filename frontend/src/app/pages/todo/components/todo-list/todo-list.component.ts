import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Todos } from '../../../../interfaces/todos';
import { Note } from '../../../../interfaces/note';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['key',  'text', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		public api: ApiService,
		public dialog: MatDialog
	) { 
	}

	ngOnInit(): void {
		// this.updatetable();
		
	}

	updatetable(){
			this.api.getServer();
			this.dataSource = new MatTableDataSource<Todos>(this.api.tb_array);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
	}

	// get todos() {
	// 	if (this.api.tb_array.length>0) {
	// 		console.log('1');
	// 		return this.updatetable();
	// 	}
	// 	this.api.getServer();
	// 	return 0
	// }

	// get filters() {
	// 	return this.api.filter;
	// }
	toggleDoneID(id: any) {
		let key : number = Number(id);
		let note: Note = this.api.getTodoByID(key);
		note.done = !note.done;
		this.api.updateTodoByID(key, note)
	}

	toggleImportantID(id: any) {
		let note = this.api.getTodoByID(Number(id));
		note.important = !note.important;
		this.api.updateTodoByID(Number(id), note)
	}
	
	onDeleteID(id: any) {
		this.api.deleteTodoByID(Number(id));
	}

}
