import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Todos } from '../../../../interfaces/todos';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['key', 'done', 'text', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		public api: ApiService,
		public dialog: MatDialog
	) { 
	}

	ngOnInit(): void {
	}

	get todos() {
		if (this.api.getTodosAll().size>0) {
			let arr = [];
			for(let obj of this.api.notes.entries()){
				let item = {
					key: obj[0],
					done: obj[1].done,
					text: obj[1].text,
					important: obj[1].important
				}
				arr.push(item);
			}
			this.dataSource = new MatTableDataSource<Todos>(arr);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			// return this.api.getTodosAll();
			return arr;
		}

		return 0;
	}

	get filters() {
		return this.api.filter;
	}

}
