import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	update_data: string = '';

	constructor(
		public api:ApiService
	) { }

	ngOnInit(): void {

	}

	onUpdateData(){
		console.log('need update');
		this.update_data = 'ok';
		setTimeout(
			()=>{this.update_data = '';}, 1000
		)
	}

}
