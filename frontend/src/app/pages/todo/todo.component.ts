import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	update_data: string = '';
	filterDone = null;
	filterNote : string = "";

	constructor() { }

	ngOnInit(){
	}

	getValueFilterButton(value){
		this.filterDone = value;
	}

	filterTable(letter){
		this.filterNote = letter;
	}

	onUpdateData(){
		this.update_data = 'ok';
		setTimeout( () => {this.update_data = '';}, 500 );
	}

}
