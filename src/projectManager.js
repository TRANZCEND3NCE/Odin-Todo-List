import { createProject } from "./project.js";

function createProjectManager(savedProjects = null) {
	const projects = 
		savedProjects && savedProjects.length > 0
			? savedProjects
			: [createProject("Inbox")];

	const inbox = projects[0];

	let selectedProjectId = inbox.id;

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

	function getProject (projectId) {
		return projects.find((project) => project.id === projectId);
	}

	function getSelectedProject() {
		return getProject(selectedProjectId);
	}

	function setSelectedProject(projectId) {
		const project = getProject(projectId);

		if (!project) {
			return null;
		}

		selectedProjectId = projectId;

		return project;
	}

	function removeProject(projectId) {
		if (projectId === inbox.id) {
			return null;
		}

		const projectIndex = projects.findIndex((project) => project.id === projectId);

		if (projectIndex === -1) {
			return null;
		}

		const [removedProject] = projects.splice(projectIndex, 1);

		if (selectedProjectId === projectId) {
			selectedProjectId = inbox.id;
		}

		return removedProject;
	}

	return {
		projects,
		addProject,
		getProject,
		getSelectedProject,
		setSelectedProject,
		removeProject,
	};
}

export { createProjectManager };