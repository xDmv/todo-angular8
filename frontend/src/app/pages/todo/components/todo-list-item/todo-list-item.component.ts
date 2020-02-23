import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../interfaces/note';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todoitem: Note;
  @Input() notekey: any;
  @Input() index: number;

  constructor(
    public api: ApiService
  ) {

  }

  ngOnInit() {
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

  onDeleteID(id: any) {
    this.api.deleteTodoByID(Number(id));
  }

}
