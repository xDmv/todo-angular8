import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo-add',
	templateUrl: './todo-add.component.html',
	styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

	addNoteForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService
	) { }

	ngOnInit(): void {
		this.addNoteForm = this.formBuilder.group({
			note: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
		})
	}

	onCreateNote(){
		if (this.addNoteForm.invalid) {
			return;
		}
		let x = this.addNoteForm.controls.note.value;
		console.log(`x = ${x}`);
		this.api.createTodo(x);
	}
}
