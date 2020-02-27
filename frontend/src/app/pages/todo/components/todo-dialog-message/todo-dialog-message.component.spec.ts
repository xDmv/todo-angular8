import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDialogMessageComponent } from './todo-dialog-message.component';

describe('TodoDialogMessageComponent', () => {
  let component: TodoDialogMessageComponent;
  let fixture: ComponentFixture<TodoDialogMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDialogMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
