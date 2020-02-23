import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note'

const URL_API = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public lastId: number = 0;
  public notes = new Map();

  constructor(
    public http: HttpClient
  ) {
    console.log(this.notes.size);
  }

  createTodo(text: string) {
    
    const url = URL_API ;
    const myHeaders = new HttpHeaders({
      "Content-Type" : "application/json"
    });
    const body: Note = {
      text,
      done: false,
      important: false
    }

    this.notes.set(++this.lastId, body);

    // const result = this.http.post(url, body);
    // result.subscribe(
    //   (data) => { console.log(data) },
    //   (error) => { console.log('Error') }
    // );
  }

  getTodosAll() {
    return this.notes;
  }

  getTodoByID(id: number) {
    return this.notes.get(id);
  }

  updateTodoByID(id: number, todo: Note) { 
    console.log(id);
    console.log(todo);
    this.notes.set(id, todo);
    console.log(this.notes)
  }

  deleteTodoByID(id: number) { 
    this.notes.delete(id);
  }

}
