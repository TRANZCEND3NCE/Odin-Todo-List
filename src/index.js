import "./styles.css";

import { createTodo } from "./todo.js";
import { createProjectManager } from "./projectManager.js";

const projectManager = createProjectManager();

const work = projectManager.addProject("Work");

const todo = createTodo(
	"Study Javascript",
	"Work on the Todo List Project",
	"2026-09-05",
	"high"
);

work.addTodo(todo);

const selectedTodo = work.getTodo(todo.id);

console.log("Before Update:", {
	title: selectedTodo.title,
	description: selectedTodo.description,
	dueDate: selectedTodo.dueDate,
	priority: selectedTodo.priority,
});

selectedTodo.updateDetails(
	"Study factory functions",
	"review factory functions and modules",
	"2026-09-08",
	"medium"
)

console.log("After update:", {
	title: selectedTodo.title,
	description: selectedTodo.description,
	dueDate: selectedTodo.dueDate,
	priority: selectedTodo.priority,
});