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
	displayedColumns: string[] = ['id', 'text', 'button'];
	@ViewChild(MatPaginator, { static: false } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	@Input() set FilterButton(value: string){
			this.getAllData();
	}
	@Input() set filterTable(filterValue: string){
		// const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
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

	// applyFilter(event: Event) {
	// 	const filterValue = (event.target as HTMLInputElement).value;
	// 	this.dataSource.filter = filterValue.trim().toLowerCase();
	// }

	filterInputData(data: any){
		let result : Todo[] = [];
		data.map(
			(value) => {
				if(value.done === Number(this.api.filter)){
					let item: Todos = {
						id: value.id,
						done: value.done,
						important: value.done,
						text: value.text
					}
					result.push(item);
				}
			}
		)
		return result;
	}

	getAllData(){
		this.api.getTodosAll().subscribe(
			(data) =>{
				let database: any = data;
				if((this.api.filter !== 'null') && ( this.api.filter !== undefined)){
					let data = this.filterInputData(database.data);
					this.dataSource = new MatTableDataSource<Todo>(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					return
				}
				this.dataSource = new MatTableDataSource<Todo>(database.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(error) =>{
				console.error(error);
			}
		);
	}

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
