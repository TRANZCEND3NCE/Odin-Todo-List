

function createProject(name) {
	const todos = [];

	function addTodo(todo) {
		todos.push(todo);
	}

	return {
		name,
		todos,
		addTodo,
	};
}

export { createProject };