

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

		updateDetails(title, description, dueDate, priority) {
			this.title = title;
			this.description = description;
			this.dueDate = dueDate;
			this.priority = priority;
		},
	};
}

export { createTodo };