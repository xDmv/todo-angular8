import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


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

  get todos() {
    return this.api.getTodosAll();
  }

  get filters() {
    return this.api.filter;
  }
}
