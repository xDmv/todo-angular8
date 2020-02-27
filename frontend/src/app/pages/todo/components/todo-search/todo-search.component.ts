import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-todo-search',
	templateUrl: './todo-search.component.html',
	styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent implements OnInit {

	@Output() filterValue = new EventEmitter();
	constructor() { }

	ngOnInit(): void {
	}

	onSeach(){
		
	}
}
