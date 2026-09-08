

function renderProjects(projects) {
	const projectList = document.querySelector("#project-list");

	projectList.textContent = "";

	projects.forEach((project) => {
		const projectButton = document.createElement("button");

		projectButton.textContent = project.name;
		projectButton.dataset.projectId = project.id;

		projectList.appendChild(projectButton);
	});
}

export { renderProjects };