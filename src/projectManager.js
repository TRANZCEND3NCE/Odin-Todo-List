import { createProject } from "./project.js";

// Project Manager
function createProjectManager(savedProjects = null) {

	// Initial Project Data
	const projects = 
		savedProjects && savedProjects.length > 0
			? savedProjects
			: [createProject("Inbox")];

	const inbox = projects[0];

	let selectedProjectId = inbox.id;

	// Add Project
	function addProject(name) {
		const trimmedName = name.trim();

		if (!trimmedName) {
			return null;
		}

		// Check For Duplicate Project Name
		const projectExists = projects.some((project) => project.name.toLowerCase() === trimmedName.toLowerCase());

		if (projectExists) {
			return null;
		}

		// Create And Store Project
		const project = createProject(trimmedName);

		projects.push(project);

		return project;
	}

	// Get Project
	function getProject (projectId) {
		return projects.find((project) => project.id === projectId);
	}

	// Get Selected Project
	function getSelectedProject() {
		return getProject(selectedProjectId);
	}

	// Set Selected Project
	function setSelectedProject(projectId) {
		const project = getProject(projectId);

		if (!project) {
			return null;
		}

		selectedProjectId = projectId;

		return project;
	}

	// Remove Project
	function removeProject(projectId) {

		// Prevent Inbox From Being Deleted
		if (projectId === inbox.id) {
			return null;
		}

		// Find Project Index
		const projectIndex = projects.findIndex((project) => project.id === projectId);

		if (projectIndex === -1) {
			return null;
		}

		// Remove Project
		const [removedProject] = projects.splice(projectIndex, 1);

		// Reset Selection If Needed
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