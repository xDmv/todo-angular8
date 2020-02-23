import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
  }

  get allitem() { 
    return this.api.notes.size;
  }

  get alldone() { 
    let done = this.api.notes;
    let doneall: number = 0;
    for (let amount of done.values()) {
      if (amount.done) {
        ++doneall
      }
    }
    return doneall
  }

  get alldelete() {
    return this.api.delete;
  }
}
