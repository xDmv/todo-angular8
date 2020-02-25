import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoClearComponent } from './todo-clear.component';

describe('TodoClearComponent', () => {
  let component: TodoClearComponent;
  let fixture: ComponentFixture<TodoClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
