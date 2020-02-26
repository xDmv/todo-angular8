import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo-add',
	templateUrl: './todo-add.component.html',
	styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

	addNoteForm: FormGroup;
	note = new FormControl('', [Validators.minLength(3), Validators.maxLength(250)]);

	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService
	) { }

	ngOnInit(): void {
	}

	onCreateNote(){
		if (this.note.invalid) {
			return;
		}
		console.log(this.note.value);
		this.api.createTodo(this.note.value);
		this.note.clearValidators;
		// this.addNoteForm.controls.note.clearValidators;
	}


}
