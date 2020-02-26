import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {

  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {
  }

  setFilterStatus(value) { 
    console.log(`value: ${value}`);
    this.api.filter = value;
  }

  onClearAll() {
    this.api.ClearAll();
  }

  get filter() {
    return this.api.filter;
  }
}
