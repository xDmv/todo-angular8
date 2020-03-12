import { Component, OnInit, Inject } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';

export interface DialogData {
	message: string;
	note: string;
	edit_note: boolean;
}

@Component({
	selector: 'app-todo-dialog-message',
	templateUrl: './todo-dialog-message.component.html',
	styleUrls: ['./todo-dialog-message.component.scss']
})
export class TodoDialogMessageComponent implements OnInit {

	new_note = new FormControl('', [
		Validators.required,
		Validators.minLength(3), 
		Validators.maxLength(250)
	]);

	onclick_input: boolean = true;

	constructor(
		public dialogRef : MatDialogRef<TodoListComponent>,
			@Inject(MAT_DIALOG_DATA) public dataparam: DialogData
	) { }

	ngOnInit() {
	}

	onOk(){
		if(this.dataparam.edit_note){
			if((this.new_note.invalid)&&(this.onclick_input)){
				this.dialogRef.close(this.dataparam.note);
			}
			if((this.new_note.valid)){
				this.dialogRef.close(this.new_note.value);
			}
			return
		} 
		this.dialogRef.close('ok');
	}

	onCancale(){
		this.dialogRef.close('not');
	}

	onChange(){
		this.onclick_input = false;
	}
}
