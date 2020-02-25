import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note'

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
	public notes = new Map();
	public filter = null;
	public delete: number = 0;

	temp = new Map();

	constructor(
		public http: HttpClient
	) {
		// this.getServer();
	}

	getServer(){
		const result = this.http.get(URL_API, {headers: myHeaders});
		result.subscribe(
		(data) => { 
			console.log('data get: ',  data)
			let db_data : any = data;
			db_data.data.map(
				(value) =>{ 
					let note : Note = {
						text : value.text,
						done: value.done,
						important: value.important
					}
					this.notes.set(value.id, note);
				}
			);
		},
		error => {console.log('error get:',  error)}
		)
	}

	getTodosAll() {
		return this.notes;
	}

	createTodo(text: string) {
		const url = URL_API;
		const body: Note = {
			text,
			done: false,
			important: false
		}
		this.notes.set(++this.lastId, body);

		const result = this.http.post(url, body, {headers: myHeaders});
		result.subscribe(
			(data) => { console.log(data) },
			(error) => { console.log(error) }
		);
	}

	getTodoByID(id: number) {
		return this.notes.get(id);
	}

	updateTodoByID(id: number, todo: Note) { 
		this.notes.set(id, todo);
		const url = `${URL_API}/${id}`;
		this.http.put(url, todo, {headers: myHeaders}).subscribe(
			data => { console.log('data update: ',  data) },
			error => {console.log('error update:',  error)}
		)
	}

	deleteTodoByID(id: number) { 
		this.notes.delete(id);
		this.delete++;
		const url = `${URL_API}/${id}`;
		this.http.delete(url, {headers: myHeaders}).subscribe(
			data => { console.log('data delete: ',  data) },
			error => {console.log('delete error:',  error)}
		);
	}

	ClearAll() {
		this.notes.clear();
		this.filter = null;
		this.lastId = 0;
		this.delete = 0;
	}

}
