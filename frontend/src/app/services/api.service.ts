import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note'
import { Todo } from '../class/todo';
import { Observable } from 'rxjs';

const entity = 'notes'
const URL_API = environment.url_api.replace('ENTITY_TYPE', entity);
const myHeaders = new HttpHeaders({
	"Content-Type" : "application/json"
});

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	public lastId: number = 0;
	// public notes = new Map();
	public notes: Todo[] = [];
	public filter = null;
	public delete: number = 0;
	public tb_array = [];
	temp = new Map();

	constructor(
		public http: HttpClient
	) {
		//this.getServer();
	}

	getServer(){
		const result = this.http.get(URL_API, {headers: myHeaders});
		result.subscribe(
		(data) => { 
			console.log('data get: ',  data)
			let database: any = data;
			let database_ = database.data ;
			console.log(database_);
			// database_.map((value)=>{
			// 	// Object.assign(this.notes, ... value);
			// 	console.log(value.id);
			// 	// console.log(
			// 	// 	this.notes.filter(this.notes.[0].key => this.notes.key)
			// 	// )
			// }
			// )
			console.log(this.notes)
			// let db_data : any = data;
			// db_data.data.map(
			// 	(value) =>{ 
			// 		let note : Note = {
			// 			text : value.text,
			// 			done: value.done,
			// 			important: value.important
			// 		}
			// 		this.notes.set(value.id, note);
			// 	}
			// );
			// for(let obj of this.notes.entries()){
			// 	let item = {
			// 		key: obj[0],
			// 		done: obj[1].done,
			// 		text: obj[1].text,
			// 		important: obj[1].important
			// 	}
			// 	this.tb_array.push(item);
			// }
			// console.log(this.tb_array)
		},
		error => {console.log('error get:',  error)}
		)
	}

	getTodosAll() {
		return this.notes;
	}

	createTodo(body: Note) {
		const result = this.http.post(URL_API, body, {headers: myHeaders});
		result.subscribe(
			(data) => { 
				let obj: any  = data;
				let new_note : Todo = 
					{
						key: obj.id,
						done: body.done,
						important: body.important,
						text: body.text
					}
				;
				console.log(new_note);
				this.notes.push(new_note);
				console.log(this.notes);
			},
			(error) => { console.log(error) }
		);
	}

	getTodoByID(id: number) {
		// return this.notes.get(id);
	}

	updateTodoByID(id: number, todo: Note) { 
		// this.notes.set(id, todo);
		// const url = `${URL_API}/${id}`;
		// this.http.put(url, todo, {headers: myHeaders}).subscribe(
		// 	data => { console.log('data update: ',  data) },
		// 	error => {console.log('error update:',  error)}
		// )
	}

	deleteTodoByID(id: number) { 
		// this.notes.delete(id);
		// this.delete++;
		// const url = `${URL_API}/${id}`;
		// this.http.delete(url, {headers: myHeaders}).subscribe(
		// 	data => { console.log('data delete: ',  data) },
		// 	error => {console.log('delete error:',  error)}
		// );
	}

	ClearAll() {
		this.notes = [];
		this.filter = null;
		this.lastId = 0;
		this.delete = 0;
	}

}
