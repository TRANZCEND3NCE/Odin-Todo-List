

function renderProjects(projects, selectedProjectId) {
	const projectList = document.querySelector("#project-list");

	projectList.textContent = "";

	projects.forEach((project) => {
		const projectButton = document.createElement("button");

		projectButton.textContent = project.name;
		projectButton.dataset.projectId = project.id;

		if (project.id === selectedProjectId) {
			projectButton.classList.add("active");
		}

		projectList.appendChild(projectButton);
	});
}

function renderSelectedProject(project) {
	const projectTitle = document.querySelector("#project-title");

	projectTitle.textContent = project.name;
}

function renderTodos(todos) {
	const todoList = document.querySelector("#todo-list");

	todoList.textContent = "";

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

		todoItem.appendChild(todoCheckbox);
		todoItem.appendChild(todoTitle);
		todoItem.appendChild(todoDueDate);
		todoItem.appendChild(todoPriority);
		todoItem.appendChild(todoStatus);

		todoList.appendChild(todoItem);
	});
}

function setupProjectSelection(projectManager) {
	const projectList = document.querySelector("#project-list");

	projectList.addEventListener("click", (e) => {
		const projectButton = e.target.closest("button");

		if (!projectButton) {
			return;
		}

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

function setupTodoForm(onTodoSubmit) {
	const todoForm = document.querySelector("#todo-form");

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const title =document.querySelector("#todo-title")
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

		onTodoSubmit({
			title,
			description,
			dueDate,
			priority,
		});

		todoForm.reset();
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

export { renderProjects, setupProjectSelection, renderTodos, renderSelectedProject, setupTodoForm, setupTodoCompletion };