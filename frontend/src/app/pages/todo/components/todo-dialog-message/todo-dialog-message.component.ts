import { Component, OnInit, Inject } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	message: string;
	note: string;
}

@Component({
	selector: 'app-todo-dialog-message',
	templateUrl: './todo-dialog-message.component.html',
	styleUrls: ['./todo-dialog-message.component.scss']
})
export class TodoDialogMessageComponent implements OnInit {

	constructor(
		public dialogRef : MatDialogRef<TodoListComponent>,
			@Inject(MAT_DIALOG_DATA) public dataparam: DialogData
	) { }

	ngOnInit() {
	}

	onOk(){
		this.dialogRef.close('ok');
	}

	onCancale(){
		this.dialogRef.close();
	}

}
