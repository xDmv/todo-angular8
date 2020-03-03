import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo-filter',
	templateUrl: './todo-filter.component.html',
	styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {

	@Output() onFilter = new EventEmitter()
	constructor(
		public api: ApiService
	) { }

	ngOnInit(): void {
	}

	setFilterStatus(value) { 
		this.api.filter = value;
		this.onFilter.emit(value);
	}

}
