

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
		todoTitle.textContent = todo.title;

		const todoDueDate = document.createElement("span");
		todoDueDate.textContent = todo.dueDate;

		const todoPriority = document.createElement("span");
		todoPriority.textContent = todo.priority;
		todoPriority.classList.add(
			"todo-priority",
			`priority-${todo.priority}`
		);

		const todoStatus = document.createElement("span");
		todoStatus.textContent = todo.completed ? "Complete" : "Incomplete";

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
		todoItem.appendChild(editButton);
		todoItem.appendChild(deleteButton);

		todoList.appendChild(todoItem);
	});
}

function renderProjectError(message) {
	const projectError = document.querySelector("#project-error");

	projectError.textContent = message;
}

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

		const projectButtons = projectList.querySelectorAll("button");

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

function setupProjectDeletion(projectManager) {
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

		resetTodoForm();

		const selectedProject = projectManager.getSelectedProject();

		renderProjects(projectManager.projects, selectedProject.id);

		renderSelectedProject(selectedProject);
		renderTodos(selectedProject.todos);
	});
}

function setupTodoForm(onTodoSubmit) {
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
	});
}

function setupTodoCompletion(projectManager) {
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

		renderTodos(project.todos);
	});
}

function setupTodoDeletion(projectManager) {
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

		renderTodos(project.todos);
	})
}

function resetTodoForm() {
	const todoForm = document.querySelector("#todo-form");
	const submitButton = todoForm.querySelector('button[type="submit"]');

	todoForm.reset();

	delete todoForm.dataset.editingTodoId;

	submitButton.textContent = "Add Todo";
}

function setupTodoEditing(projectManager) {
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
	})
}

export { 
	 renderProjects, 
	 setupProjectSelection,
	 renderTodos,
	 renderProjectError,
	 renderSelectedProject,
	 setupProjectForm,
	 setupProjectDeletion,
	 setupTodoForm,
	 setupTodoCompletion,
	 setupTodoDeletion,
	 setupTodoEditing
 };