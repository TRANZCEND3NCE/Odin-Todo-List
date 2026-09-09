import "./styles.css";

import { createTodo } from "./todo.js";
import { createProjectManager } from "./projectManager.js";
import { renderProjects, renderSelectedProject, renderTodos, setupProjectSelection, setupTodoForm } from "./dom.js";

const projectManager = createProjectManager();

projectManager.addProject("Work");
projectManager.addProject("Personal");
projectManager.addProject("Shopping");

const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);

renderSelectedProject(selectedProject);
renderTodos(selectedProject.todos);

setupProjectSelection(projectManager);

setupTodoForm((todoData) => {
	const project = projectManager.getSelectedProject();

	const todo = createTodo(
		todoData.title,
		todoData.description,
		todoData.dueDate,
		todoData.priority
	);

	project.addTodo(todo);

	renderTodos(project.todos);
});