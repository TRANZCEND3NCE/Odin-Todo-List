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

const selectedProject = projectManager.getProject(work.id);

selectedProject.addTodo(todo);

console.log(selectedProject);