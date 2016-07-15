export default class StimpakProject {
	setup(stimpak) {
		stimpak
		.note("Basic Project Information")
		.prompt({
			type: "input",
			name: "projectName",
			message: "What is your project's name?",
			default: "My Project Name"
		}, {
			type: "input",
			name: "projectDescription",
			message: "How would you describe your project?",
			default: "I don't have a description for it, yet."
		});
	}
}
