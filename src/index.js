import "./styles.css";

import { saveProjects, loadProjects } from "./storage.js";
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
	setupTodoEditing,
	setupTodoDetails
} from "./dom.js";

const savedProjects = loadProjects();

const projectManager = createProjectManager(savedProjects);

function saveData() {
	saveProjects(projectManager.projects);
}

if (!savedProjects || savedProjects.length === 0) {
	saveData();
}

const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);

renderSelectedProject(selectedProject);
renderTodos(selectedProject.todos);

setupProjectSelection(projectManager);
setupProjectDeletion(projectManager, saveData);

setupTodoCompletion(projectManager, saveData);
setupTodoDeletion(projectManager, saveData);
setupTodoEditing(projectManager);
setupTodoDetails();

setupProjectForm((projectName) => {
	const project = projectManager.addProject(projectName);

	if (!project) {
		renderProjectError(
			"Please enter a unique project name."
		);

		return;
	}

	renderProjectError("");

	saveData();

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

		saveData();

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

	saveData();

	renderTodos(project.todos);
});