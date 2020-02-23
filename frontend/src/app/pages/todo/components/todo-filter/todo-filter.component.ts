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

  setFilterStatus(st: string) { 
    switch(st) { 
      case "null": { 
        this.api.filter = null;
        break; 
      } 
      case "true": { 
        this.api.filter = true;
        break; 
      } 
      case "false": { 
        this.api.filter = false;
        break; 
      } 
      default: { 
        this.api.filter = null;
        break; 
      }
    }
  }

  onClearAll() {
    this.api.ClearAll();
  }

  get filter() {
    return this.api.filter;
  }
}
