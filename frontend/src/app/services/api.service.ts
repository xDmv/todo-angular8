import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note';


const entity = 'api/notes';
const URL_API = environment.url_api.replace('ENTITY_TYPE', entity);
const myHeaders = new HttpHeaders({
  'Content-Type' : 'text/html'

});

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	public filter = null;

	constructor(
		public http: HttpClient
	) {
		this.filter = null;
	}

	getTodosAll() {
		console.log(`URL_API: ${URL_API}`);
		const result = this.http.get(URL_API, {headers: myHeaders});
		return result;
	}

	createTodo(body: Note) {
	  console.log('createTodo: ', body);
		const result = this.http.post(URL_API, body, {headers: myHeaders});
		return result;
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
		const url = `${URL_API}/delAll`;
		const body = { confirm : 'Yes, delete all items.'};
		const result = this.http.delete(url, {headers: myHeaders } );
		return result;
	}

}
