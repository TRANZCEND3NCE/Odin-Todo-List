import { createProject } from "./project.js";

function createProjectManager() {
	const projects = [];

	const inbox = createProject("Inbox");
	projects.push(inbox);

	function addProject(name) {
		const project = createProject(name);

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