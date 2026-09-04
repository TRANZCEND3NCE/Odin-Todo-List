import "./styles.css";

import { createTodo } from "./todo.js";
import { createProjectManager } from "./projectManager.js";

const projectManager = createProjectManager();

const work = projectManager.addProject("Work");
const personal = projectManager.addProject("Personal");

const duplicate = projectManager.addProject("work");
const empty = projectManager.addProject("   ");
const spaced = projectManager.addProject("   Shopping    ");

console.log(
	"Projects:",
	projectManager.projects.map((project) => project.name)
);

console.log("Duplicate result:", duplicate);
console.log("Empty result:", empty);
console.log("Spaced name:", spaced.name);