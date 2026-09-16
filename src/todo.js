

function createTodo(
	title,
	description,
	dueDate,
	priority,
	completed = false,
	id = crypto.randomUUID()
) {
	return {
		id,
		title,
		description,
		dueDate,
		priority,
		completed,

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