import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note'
import { Todo } from '../class/todo';


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
	) {	}

	getTodosAll() {
		const result = this.http.get(URL_API, {headers: myHeaders});
		return result;
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
		const url = `${URL_API}/${id}`;
		const result = this.http.get(url, {headers: myHeaders});
		return result;
	}

	updateTodoByID(id: number, todo: Note) { 
		const url = `${URL_API}/${id}`;
		const result = this.http.put(url, todo, {headers: myHeaders});
		return result;
	}

	deleteTodoByID(id: number) { 
		const url = `${URL_API}/${id}`;
		const result = this.http.delete(url, {headers: myHeaders});
		return result;
	}

	ClearAll() {
		this.notes = [];
		this.filter = null;
		this.lastId = 0;
		this.delete = 0;
	}

}
