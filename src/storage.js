import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

// Save Projects
function saveProjects(projects) {
  localStorage.setItem(
    "todoProjects",
    JSON.stringify(projects)
  );
}

// Load Projects
function loadProjects() {
	const savedProjects = localStorage.getItem("todoProjects");

	if (!savedProjects) {
		return null;
	}

	// Convert JSON Back Into JavaScript Data
	const parsedProjects = JSON.parse(savedProjects);

	// Rebuild Projects
	return parsedProjects.map((savedProject) => {
		const project = createProject(
			savedProject.name,
			savedProject.id
		);

		// Rebuild Todos
		savedProject.todos.forEach((savedTodo) => {
			const todo = createTodo(
				savedTodo.title,
				savedTodo.description,
				savedTodo.dueDate,
				savedTodo.priority,
				savedTodo.completed,
				savedTodo.id
			);

			project.addTodo(todo);
		});

		return project;
	});
}

export { saveProjects, loadProjects };