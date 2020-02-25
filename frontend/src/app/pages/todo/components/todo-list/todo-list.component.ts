import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['idex', 'done', 'note', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	constructor(
		public api: ApiService,
		public dialog: MatDialog
	) { 
		this.api.getServer();
	}

	ngOnInit(): void {
		this.getAllTodos();
	}

	getAllTodos(){
		
		let arr = [];
		console.log(this.api.notes);
		for(let obj of this.api.notes.entries()){
			let item = {
				key: obj.keys,
				done: obj.values
			}
			// arr.push(item);
			console.log(item);
		}
		// console.log(arr);
		// this.dataSource = new MatTableDataSource(arr);
		// this.dataSource.paginator = this.paginator;
		// this.dataSource.sort = this.sort;
	}

	get todos() {
		return this.api.getTodosAll();
	}

	get filters() {
		return this.api.filter;
	}

}
