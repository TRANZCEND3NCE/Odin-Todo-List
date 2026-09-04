import "./styles.css";
import { createProjectManager } from "./projectManager.js";

const projectManager = createProjectManager();

const work1 = projectManager.addProject("Work");
const work2 = projectManager.addProject("Work");

console.log(
	"Before removal:",
	projectManager.projects.map((project) => ({
		id: project.id,
		name: project.name,
	}))
);

projectManager.removeProject(work1.id);

console.log(
	"After removal:",
	projectManager.projects.map((project) => ({
		id:project.id,
		name: project.name,
	}))
);

const inbox = projectManager.projects[0];

projectManager.removeProject(inbox.id);

console.log(
  "After trying to remove Inbox:",
  projectManager.projects.map((project) => project.name)
);