

function renderProjects(projects, selectedProjectId) {
	const projectList = document.querySelector("#project-list");

	projectList.textContent = "";

	projects.forEach((project) => {
		const projectButton = document.createElement("button");

		projectButton.textContent = project.name;
		projectButton.dataset.projectId = project.id;

		if (project.id === selectedProjectId) {
			projectButton.classList.add("active");
		}

		projectList.appendChild(projectButton);
	});
}

function renderSelectedProject(project) {
	const projectTitle = document.querySelector("#project-title");

	projectTitle.textContent = project.name;
}

function setupProjectSelection(projectManager) {
	const projectList = document.querySelector("#project-list");

	projectList.addEventListener("click", (e) => {
		const projectButton = e.target.closest("button");

		if (!projectButton) {
			return;
		}

		const projectId = projectButton.dataset.projectId;

		const project = projectManager.setSelectedProject(projectId);

		if (!project) {
			return;
		}

		const projectButtons = projectList.querySelectorAll("button");

		projectButtons.forEach((button) => {
			button.classList.remove("active");
		});

		projectButton.classList.add("active");

		renderSelectedProject(project);
	});
}

export { renderProjects, setupProjectSelection, renderSelectedProject };