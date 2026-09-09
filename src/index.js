import "./styles.css";

import { createTodo } from "./todo.js";
import { createProjectManager } from "./projectManager.js";
import { renderProjects, renderSelectedProject, renderTodos, setupProjectSelection } from "./dom.js";

const projectManager = createProjectManager();

const work = projectManager.addProject("Work");
projectManager.addProject("Personal");
projectManager.addProject("Shopping");

const inbox = projectManager.getSelectedProject();

const inboxTodo = createTodo(
	"Learn JavaScript",
	"Continue working through The Odin Project",
	"2026-09-12",
	"high"
);

const workTodo1 = createTodo(
	"Finish report",
	"Finish the monthly report",
	"2026-09-15",
	"high"
);

const workTodo2 = createTodo(
	"Send email",
	"Send the project update",
	"2026-09-16",
	"medium"
);

inbox.addTodo(inboxTodo);

work.addTodo(workTodo1);
work.addTodo(workTodo2);

const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);
renderSelectedProject(selectedProject);
renderTodos(selectedProject.todos);
setupProjectSelection(projectManager);