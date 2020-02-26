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
		this.getServer();
	}

	getServer(){
		const result = this.http.get(URL_API, {headers: myHeaders});
		result.subscribe(
		(data) => { 
			console.log('data get: ',  data)
			let database: any = data;
			let database_ = database.data as Todo[];
			// return database_;
// console.log(database_);
			// database_.map((value)=>{
			// 	let obj = {
			// 		id: value.id,
			// 		done: value.done,
			// 		important: value.important,
			// 		text: value.text
			// 	}
			// 	this.notes.push(obj);
			// });
			// console.log(this.notes)
		},
		error => {console.log('error get:',  error); }
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
						id: obj.id,
						done: body.done,
						important: body.important,
						text: body.text
					}
				;
				this.notes.push(new_note);
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
