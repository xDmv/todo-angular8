import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoDialogMessageComponent } from '../todo-dialog-message/todo-dialog-message.component';
import { Todos } from '../../../../interfaces/todos';
import { Todo } from '../../../../class/todo';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	dataSource = new MatTableDataSource();
	displayedColumns: string[] = ['id', 'done', 'text', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@Input() test: boolean;
	@Input() set updateTable(update: string){
		if(update === "ok"){
			console.log('up');
			this.getAllData();
		}
	}

	constructor(
		public api: ApiService,
		public dialog: MatDialog
	) { 
	}

	ngOnInit(): void {
		this.getAllData();

	}

	getAllData(){
		this.api.getTodosAll().subscribe(
			(data) =>{
				console.log(`this.api.filter: ${this.api.filter}`);
				let database: any = data;
				this.dataSource = new MatTableDataSource<Todo>(database.data );
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				if(this.api.filter !== null){
					console.log('1');
					this.dataSource.filter = this.api.filter;
					// this.dataSource.filterPredicate = function(data, filter: string): boolean {
					// 	return 
					//   };
				}


				// console.log(database.data.filter(x => x.done === this.api.filter));
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
			(data) => { this.getAllData();},
			(error) => { console.error(error)}
		);
	}

	toggleImportantID(id: any, note: Todos) {
		let key : number = Number(id);
		note.important = note.important === 0 ? 1:0;
		this.api.updateTodoByID(key, note).subscribe(
			(data) => { this.getAllData(); },
			(error) => { console.error(error)}
		);
	}
	
	onDeleteID(id: any, note: string) {
		let key : number = Number(id);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = false;
		dialogConfig.data = {
			message: "Do you really have to delete this note?",
			note: note
		}
		const dialogRef = this.dialog.open(TodoDialogMessageComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
			result => {
				if(result === 'ok'){
					this.api.deleteTodoByID(key).subscribe(
						(data) => { this.getAllData(); },
						(error) => { console.error(error)}
					);
				}
			}
		);

	}

}
