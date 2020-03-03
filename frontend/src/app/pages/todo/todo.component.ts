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
	filterNote : string = "";

	constructor(
		public api:ApiService
	) { }

	ngOnInit(){
	}

	getValueFilterButton(value){
		this.filterDone = value;
		// setTimeout( () => {this.filterDone = null;}, 500 );
	}

	filterTable(letter){
		this.filterNote = letter;
	}

	onUpdateData(){
		this.update_data = 'ok';
		setTimeout( () => {this.update_data = '';}, 500 );
	}

}
