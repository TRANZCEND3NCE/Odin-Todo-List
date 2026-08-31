import "./styles.css";
import { createProjectManager } from "./projectManager.js";

const projectManager = createProjectManager();

projectManager.addProject("Work");
projectManager.addProject("Personal");

console.log("Projects:", projectManager.projects.map((project) => project.name));

projectManager.removeProject("Work");

console.log("After removing Work:", projectManager.projects.map((project) => project.name));

projectManager.removeProject("Inbox");

console.log("After trying to remove Inbox:", projectManager.projects.map((project) => project.name));