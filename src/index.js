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
	setupTodoDetails,
	setupTodoFormToggle
} from "./dom.js";

// Application Setup
const savedProjects = loadProjects();

const projectManager = createProjectManager(savedProjects);

// Helpers
function saveData() {
	saveProjects(projectManager.projects);
}

// Initial Data
if (!savedProjects || savedProjects.length === 0) {
	saveData();
}

// Initial Rendering
const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);

renderSelectedProject(selectedProject);
renderTodos(selectedProject.todos);

// Project Event Setup
setupProjectSelection(projectManager);
setupProjectDeletion(projectManager, saveData);

// Todo Event Setup
setupTodoCompletion(projectManager, saveData);
setupTodoDeletion(projectManager, saveData);
setupTodoEditing(projectManager);
setupTodoDetails();
setupTodoFormToggle();

// Project Form
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

// Todo Form
setupTodoForm((todoData, editingTodoId) => {
	const project = projectManager.getSelectedProject();

	// Edit Existing Todo
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

	// Create New Todo
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