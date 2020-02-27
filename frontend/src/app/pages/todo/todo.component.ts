import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	update_data: string = '';
	filterDone = null;

	constructor(
		public api:ApiService
	) { }

	ngOnInit(): void {

	}

	getValueFilterButton(value){
		console.log('filter btn: ', value);
		this.filterDone = value;
		// setTimeout( () => {this.filterDone = null;}, 500 );
	}

	onSeachItem(item: string){

	}

	onUpdateData(){
		this.update_data = 'ok';
		setTimeout( () => {this.update_data = '';}, 500 );
	}

}
