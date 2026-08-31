

function createTodo(title, description, dueDate, priority) {
	return {
		id: crypto.randomUUID(),
		title,
		description,
		dueDate,
		priority,
		completed: false,

		toggleComplete() {
			this.completed = !this.completed;
		},
	};
}

export { createTodo };