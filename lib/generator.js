import spdxLicenses from "./spdx-licenses.json";
import StimpakGithub from "stimpak-github";
import StimpakProject from "stimpak-project";

export default class StimpakNpm {
	setup(stimpak) {
		stimpak
		.use(
			StimpakProject,
			StimpakGithub
		)
		.then(this.prompt)
		.then(this.render);
	}

	prompt(stimpak) {
		stimpak

		.prompt({
			type: "input",
			name: "projectAuthor",
			message: "What is the name of the project author?",
			default: () => { return stimpak.answers().githubAccountName; }
		}, {
			type: "list",
			name: "license",
			message: "What license will this project be issued under?",
			choices: spdxLicenses,
			default: "MIT"
		})

		.note("NPM")
		.prompt({
			type: "input",
			name: "projectPackageName",
			message: "What is your project's npm package name?",
			default: "my-project-name"
		}, {
			type: "input",
			name: "mainFileName",
			message: "What should the package's main file be named?",
			default: "main.js"
		})
	}

	render(stimpak) {
		stimpak
		.render("**/*", `${__dirname}/../templates/common`);

		if (stimpak.answers().github) {
			stimpak
			.merge("package.json")
			.render("**/*", `${__dirname}/../templates/github`);
		}
	}
}
