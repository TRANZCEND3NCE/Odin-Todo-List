import { format, parseISO } from "date-fns";

// Rendering
function renderProjects(projects, selectedProjectId) {
	const projectList = document.querySelector("#project-list");

	projectList.textContent = "";

	projects.forEach((project, index) => {
		const projectItem = document.createElement("div");
		projectItem.classList.add("project-item");

		const projectButton = document.createElement("button");
		projectButton.type = "button";
		projectButton.classList.add("project-button");
		projectButton.textContent = project.name;
		projectButton.dataset.projectId = project.id;

		if (project.id === selectedProjectId) {
			projectButton.classList.add("active");
		}

		projectItem.appendChild(projectButton);

		if (index !== 0) {
			const deleteButton = document.createElement("button");

			deleteButton.type = "button";
			deleteButton.textContent = "Delete";
			deleteButton.classList.add("delete-project");
			deleteButton.dataset.projectId = project.id;

			projectItem.appendChild(deleteButton);
		}

		projectList.appendChild(projectItem);
	});
}

function renderSelectedProject(project) {
	const projectTitle = document.querySelector("#project-title");

	projectTitle.textContent = project.name;
}

function renderTodos(todos) {
	const todoList = document.querySelector("#todo-list");

	todoList.textContent = "";

	if (todos.length === 0) {
		const emptyMessage = document.createElement("p");

		emptyMessage.textContent = "No todos yet.";
		emptyMessage.classList.add("empty-message");

		todoList.appendChild(emptyMessage);

		return;
	}

	todos.forEach((todo) => {
		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-item");
		todoItem.dataset.todoId = todo.id;

		if (todo.completed) {
			todoItem.classList.add("completed");
		}

		const todoCheckbox = document.createElement("input");
		todoCheckbox.type = "checkbox";
		todoCheckbox.classList.add("todo-checkbox");
		todoCheckbox.checked = todo.completed;

		const todoTitle = document.createElement("span");
		todoTitle.classList.add("todo-title");
		todoTitle.textContent = todo.title;

		const todoDueDate = document.createElement("span");
		todoDueDate.classList.add("todo-due-date");
		todoDueDate.textContent = format(
			parseISO(todo.dueDate),
			"MMM d, yyyy"
		);

		const todoPriority = document.createElement("span");
		todoPriority.classList.add(
			"todo-priority",
			`priority-${todo.priority}`
		);
		todoPriority.textContent = todo.priority;

		const todoStatus = document.createElement("span");
		todoStatus.classList.add("todo-status");
		todoStatus.textContent = todo.completed ? "Complete" : "Incomplete";

		const detailsButton = document.createElement("button");
		detailsButton.type = "button";
		detailsButton.classList.add("toggle-details");
		detailsButton.textContent = "View Details";

		const todoDescription = document.createElement("p");
		todoDescription.classList.add("todo-description");
		todoDescription.textContent = todo.description;
		todoDescription.hidden = true;

		const editButton = document.createElement("button");
		editButton.type = "button";
		editButton.textContent = "Edit";
		editButton.classList.add("edit-todo");

		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.textContent = "Delete";
		deleteButton.classList.add("delete-todo");

		todoItem.appendChild(todoCheckbox);
		todoItem.appendChild(todoTitle);
		todoItem.appendChild(todoDueDate);
		todoItem.appendChild(todoPriority);
		todoItem.appendChild(todoStatus);
		todoItem.appendChild(detailsButton);
		todoItem.appendChild(editButton);
		todoItem.appendChild(deleteButton);
		todoItem.appendChild(todoDescription);

		todoList.appendChild(todoItem);
	});
}

function renderProjectError(message) {
	const projectError = document.querySelector("#project-error");

	projectError.textContent = message;
}

// Helpers
function resetTodoForm() {
	const todoForm = document.querySelector("#todo-form");
	const submitButton = todoForm.querySelector('button[type="submit"]');

	todoForm.reset();

	delete todoForm.dataset.editingTodoId;

	submitButton.textContent = "Add Todo";
}

// Project Events
function setupProjectSelection(projectManager) {
	const projectList = document.querySelector("#project-list");

	projectList.addEventListener("click", (e) => {
		const projectButton = e.target.closest(".project-button");

		if (!projectButton) {
			return;
		}

		resetTodoForm();

		const projectId = projectButton.dataset.projectId;

		const project = projectManager.setSelectedProject(projectId);

		if (!project) {
			return;
		}

		const projectButtons = projectList.querySelectorAll(".project-button");

		projectButtons.forEach((button) => {
			button.classList.remove("active");
		});

		projectButton.classList.add("active");

		renderSelectedProject(project);
		renderTodos(project.todos);
	});
}

function setupProjectForm(onProjectSubmit) {
	const projectForm = document.querySelector("#project-form");
	const projectNameInput = document.querySelector("#project-name");

	projectForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const projectName = projectNameInput.value;

		onProjectSubmit(projectName);

		projectForm.reset();
	});
}

function setupProjectDeletion(projectManager, onDataChange) {
	const projectList = document.querySelector("#project-list");

	projectList.addEventListener("click", (e) => {
		const deleteButton = e.target.closest(".delete-project");

		if (!deleteButton) {
			return;
		}

		const projectId = deleteButton.dataset.projectId;
		const removedProject = projectManager.removeProject(projectId);

		if (!removedProject) {
			return;
		}

		onDataChange();

		resetTodoForm();

		const selectedProject = projectManager.getSelectedProject();

		renderProjects(projectManager.projects, selectedProject.id);

		renderSelectedProject(selectedProject);
		renderTodos(selectedProject.todos);
	});
}

// Todo Form
function setupTodoFormToggle() {
	const showTodoFormButton =
		document.querySelector("#show-todo-form");

	const cancelTodoFormButton =
		document.querySelector("#cancel-todo-form");

	const todoDialog =
		document.querySelector("#todo-dialog");

	showTodoFormButton.addEventListener("click", () => {
		todoDialog.showModal();
	});

	cancelTodoFormButton.addEventListener("click", () => {
		resetTodoForm();
		todoDialog.close();
	});
}

function setupTodoForm(onTodoSubmit) {
	const todoDialog = document.querySelector("#todo-dialog");
	const todoForm = document.querySelector("#todo-form");

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const title = document.querySelector("#todo-title")
		.value
		.trim();

		const description = document.querySelector("#todo-description")
		.value
		.trim();

		const dueDate = document.querySelector("#todo-due-date").value;

		const priority = document.querySelector("#todo-priority").value;

		if (!title || !description || !dueDate) {
			return;
		}

		const editingTodoId = todoForm.dataset.editingTodoId || null;

		onTodoSubmit({
			title,
			description,
			dueDate,
			priority,
		}, editingTodoId);

		resetTodoForm();
		todoDialog.close();
	});
}

function setupTodoEditing(projectManager) {
	const todoDialog = document.querySelector("#todo-dialog");
	const todoList = document.querySelector("#todo-list");
	const todoForm = document.querySelector("#todo-form");

	const titleInput = document.querySelector("#todo-title");
	const descriptionInput = document.querySelector("#todo-description");
	const dueDateInput = document.querySelector("#todo-due-date");
	const priorityInput = document.querySelector("#todo-priority");

	const submitButton = todoForm.querySelector('button[type="submit"]');

	todoList.addEventListener("click", (e) => {
		if (!e.target.classList.contains("edit-todo")) {
			return;
		}

		const todoItem = e.target.closest(".todo-item");

		if (!todoItem) {
			return;
		}

		const todoId = todoItem.dataset.todoId;

		const project = projectManager.getSelectedProject();
		const todo = project.getTodo(todoId);

		if (!todo) {
			return;
		}

		titleInput.value = todo.title;
		descriptionInput.value = todo.description;
		dueDateInput.value = todo.dueDate;
		priorityInput.value = todo.priority;

		todoForm.dataset.editingTodoId = todo.id;

		submitButton.textContent = "Save Changes";

		todoDialog.showModal();
	});
}

// Todo Interactions
function setupTodoCompletion(projectManager, onDataChange) {
	const todoList = document.querySelector("#todo-list");

	todoList.addEventListener("change", (e) => {
		if (!e.target.classList.contains("todo-checkbox")) {
			return;
		}

		const todoItem = e.target.closest(".todo-item");

		if (!todoItem) {
			return;
		}

		const todoId = todoItem.dataset.todoId;

		const project = projectManager.getSelectedProject();
		const todo = project.getTodo(todoId);

		if (!todo) {
			return;
		}

		todo.toggleComplete();

		onDataChange();

		renderTodos(project.todos);
	});
}

function setupTodoDeletion(projectManager, onDataChange) {
	const todoList = document.querySelector("#todo-list");

	todoList.addEventListener("click", (e) => {
		if (!e.target.classList.contains("delete-todo")) {
			return;
		}

		const todoItem = e.target.closest(".todo-item");

		if (!todoItem) {
			return;
		}

		const todoId = todoItem.dataset.todoId;

		const project = projectManager.getSelectedProject();

		project.removeTodo(todoId);

		onDataChange();

		renderTodos(project.todos);
	});
}

function setupTodoDetails() {
	const todoList = document.querySelector("#todo-list");

	todoList.addEventListener("click", (e) => {
		const detailsButton = e.target.closest(".toggle-details");

		if (!detailsButton) {
			return;
		}

		const todoItem = detailsButton.closest(".todo-item");

		const todoDescription = todoItem.querySelector(".todo-description");

		todoDescription.hidden = !todoDescription.hidden;

		detailsButton.textContent = todoDescription.hidden ? "View Details" : "Hide Details";
	});
}

// Exports
export { 
	 renderProjects, 
	 setupProjectSelection,
	 renderTodos,
	 renderProjectError,
	 renderSelectedProject,
	 setupTodoFormToggle,
	 setupProjectForm,
	 setupProjectDeletion,
	 setupTodoForm,
	 setupTodoCompletion,
	 setupTodoDeletion,
	 setupTodoEditing,
	 setupTodoDetails
 };