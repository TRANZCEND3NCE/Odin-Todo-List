import "./styles.css";

import { createProjectManager } from "./projectManager.js";
import { renderProjects, renderSelectedProject, setupProjectSelection } from "./dom.js";

const projectManager = createProjectManager();

projectManager.addProject("Work");
projectManager.addProject("Personal");
projectManager.addProject("Shopping");

const selectedProject = projectManager.getSelectedProject();

renderProjects(projectManager.projects, selectedProject.id);
renderSelectedProject(selectedProject);
setupProjectSelection(projectManager);