import "./styles.css";

import { createProjectManager } from "./projectManager.js";
import { renderProjects } from "./dom.js";

const projectManager = createProjectManager();

projectManager.addProject("Work");
projectManager.addProject("Personal");
projectManager.addProject("Shopping");

renderProjects(projectManager.projects);