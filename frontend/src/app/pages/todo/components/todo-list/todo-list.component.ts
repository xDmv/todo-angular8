import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Note } from '../../../../interfaces/note';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {

  }


  onGetAll() { 
    if (this.api.notes.size > 0) {
      return this.api.notes
    }
    return this.api.notes
  }

  toggleImportantID(id: any) {
    let note = this.api.getTodoByID(Number(id));
    note.important = !note.important;
    this.api.updateTodoByID(Number(id), note)
  }

  toggleDoneID(id: any) {
    let key : number = Number(id);
    let note: Note = this.api.getTodoByID(key);
    note.done = !note.done;
    this.api.updateTodoByID(key, note)
  }

  moreTodo(id: number) {
    
  }

  onDeleteID(id: any) {
    this.api.deleteTodoByID(Number(id));
  }

  get todos() {
    return this.api.getTodosAll();
  }
}
