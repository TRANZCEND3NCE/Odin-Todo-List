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

	function getProject(projectId) {
		return projects.find((project) => project.id === projectId);
	}

	function removeProject(projectId) {
		if (projectId === inbox.id) {
			return;
		}

		const projectIndex = projects.findIndex((project) => project.id === projectId);

		if (projectIndex !== -1) {
			projects.splice(projectIndex, 1);
		}
	}

	return {
		projects,
		addProject,
		getProject,
		removeProject,
	};
}

export { createProjectManager };