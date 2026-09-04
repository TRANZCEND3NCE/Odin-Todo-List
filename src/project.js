

function createProject(name) {
	const todos = [];

	function addTodo(todo) {
		todos.push(todo);
	}

	function getTodo(todoId) {
		return todos.find((todo) => todo.id === todoId);
	}

	function removeTodo(todoId) {
		const todoIndex = todos.findIndex((todo) => todo.id === todoId);

		if (todoIndex !== -1) {
			todos.splice(todoIndex, 1);
		}
	}

	return {
		id: crypto.randomUUID(),
		name,
		todos,
		addTodo,
		getTodo,
		removeTodo,
	};
}

export { createProject };