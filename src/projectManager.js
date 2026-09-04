import { createProject } from "./project.js";

function createProjectManager() {
	const projects = [];

	const inbox = createProject("Inbox");
	projects.push(inbox);

	function addProject(name) {
		const trimmedName = name.trim();

		if (!trimmedName) {
			return null;
		}

		const projectExists = projects.some((project) => project.name.toLowerCase() === trimmedName.toLowerCase());

		if (projectExists) {
			return null;
		}

		const project = createProject(trimmedName);

		projects.push(project);

		return project;
	}

	function removeProject(projectName) {
		if (projectName === "Inbox") {
			return;
		}

		const projectIndex = projects.findIndex((project) => project.name === projectName);

		if (projectIndex !== -1) {
			projects.splice(projectIndex, 1);
		}
	}

	return {
		projects,
		addProject,
		removeProject,
	};
}

export { createProjectManager };