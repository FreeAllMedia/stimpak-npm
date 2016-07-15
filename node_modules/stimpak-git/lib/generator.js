import util from "util";

export default class StimpakGit {
	setup(stimpak) {
		stimpak
		.answers({
			gitignore: "gitignore" // # HACK: Fix for https://github.com/FreeAllMedia/stimpak-git/issues/1
		})
		.then(this.prompt);
	}

	prompt(stimpak) {
		stimpak
		.prompt({
			type: "confirm",
			name: "versionControl",
			message: "Will this project use git for version control?"
		})
		.then(() => {
			if (stimpak.answers().versionControl) {
				stimpak
				.answers({ versionControlType: "git", git: true })
				.then(this.promptGitFlow)
				.then(this.initialize)
				.then(this.render);
			}
		});
	}

	promptGitFlow(stimpak) {
		stimpak
		.prompt({
			type: "confirm",
			name: "gitflow",
			message: "Will this project use gitflow?"
		});
	}

	initialize(stimpak) {
		stimpak
		.info("Initializing Local Git Repo")
		.command("git init");

		if (stimpak.answers().gitflow) {
			stimpak
			.info("Initializing Gitflow")
			.command("git flow init -df");
		}
	}

	render(stimpak) {
		stimpak
		.merge(".gitignore")
		.render("**/*", `${__dirname}/../templates`);
	}
}
