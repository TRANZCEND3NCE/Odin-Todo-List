import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

function saveProjects(projects) {
  localStorage.setItem(
    "todoProjects",
    JSON.stringify(projects)
  );
}

function loadProjects() {
	const savedProjects = localStorage.getItem("todoProjects");

	if (!savedProjects) {
		return null;
	}

	const parsedProjects = JSON.parse(savedProjects);

	return parsedProjects.map((savedProject) => {
		const project = createProject(
			savedProject.name,
			savedProject.id
		);

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