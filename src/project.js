

function createProject(name) {
	const todos = [];

	function addTodo(todo) {
		todos.push(todo);
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
		removeTodo,
	};
}

export { createProject };