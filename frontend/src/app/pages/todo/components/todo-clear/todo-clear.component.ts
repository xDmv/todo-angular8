import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo-clear',
	templateUrl: './todo-clear.component.html',
	styleUrls: ['./todo-clear.component.scss']
})
export class TodoClearComponent implements OnInit {

	constructor(public api: ApiService) { }

	ngOnInit() {
	}
	onClearAll() {
		this.api.ClearAll();
	}
}
