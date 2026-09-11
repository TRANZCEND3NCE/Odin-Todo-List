import "./styles.css";

import { createTodo } from "./todo.js";
import { createProjectManager } from "./projectManager.js";
import {
	renderProjects,
	renderSelectedProject,
	renderTodos,
	renderProjectError,
	setupProjectSelection,
	setupProjectForm,
	setupProjectDeletion,
	setupTodoForm,
	setupTodoCompletion,
	setupTodoDeletion,
	setupTodoEditing
} from "./dom.js";

const projectManager = createProjectManager();

const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);

renderSelectedProject(selectedProject);
renderTodos(selectedProject.todos);

setupProjectSelection(projectManager);
setupProjectDeletion(projectManager);

setupTodoCompletion(projectManager);
setupTodoDeletion(projectManager);
setupTodoEditing(projectManager);

setupProjectForm((projectName) => {
	const project = projectManager.addProject(projectName);

	if (!project) {
		renderProjectError(
			"Please enter a unique project name."
		);

		return;
	}

	renderProjectError("");

	const selectedProject = projectManager.getSelectedProject();

	renderProjects(projectManager.projects, selectedProject.id);
});

setupTodoForm((todoData, editingTodoId) => {
	const project = projectManager.getSelectedProject();

	if (editingTodoId) {
		const todo = project.getTodo(editingTodoId);

		if (!todo) {
			return;
		}

		todo.updateDetails(
			todoData.title,
			todoData.description,
			todoData.dueDate,
			todoData.priority
		);

		renderTodos(project.todos);

		return;
	}

	const todo = createTodo(
		todoData.title,
		todoData.description,
		todoData.dueDate,
		todoData.priority
	);

	project.addTodo(todo);

	renderTodos(project.todos);
});