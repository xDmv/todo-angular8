import { Todo } from './todo';

describe('Todo', () => {
	it('should create Todo class', () => {
		expect(new Todo()).toBeTruthy();
	});

	it('Todo class should accept values in the constructor', () => {
		let todo = new Todo({
			key: 1,
			done: 1,
			important: 0,
			text: "text note"
		});
		
		expect(todo.todo.key).toEqual(0);
		expect(todo.todo.done).toEqual(1);
		expect(todo.todo.important).toEqual(0);
		expect(todo.todo.text).toEqual('text note');
	});
});
