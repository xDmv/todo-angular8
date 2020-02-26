export class Todo {
	id: number;
	done: number;
	important: number;
	text: string;

	constructor(values: Object = {}) {
			Object.assign(this, values);
		}
	}
