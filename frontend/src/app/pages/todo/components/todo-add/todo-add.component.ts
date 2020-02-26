import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Note } from '../../../../interfaces/note'

@Component({
	selector: 'app-todo-add',
	templateUrl: './todo-add.component.html',
	styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

	note = new FormControl('', [
		Validators.minLength(3), 
		Validators.maxLength(250)
	]);

	constructor(
		private api: ApiService
	) { }

	ngOnInit(): void {
	}

	onCreateNote(){
		if (this.note.invalid) {
			return;
		}
		if (this.note.value !== ''){
			let data: Note = {
				text: this.note.value,
				done: 0,
				important: 0
			}
			this.api.createTodo(data);
		} 
	}


}
