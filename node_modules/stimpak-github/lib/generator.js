import StimpakGit from "stimpak-git";

export default class StimpakGithub {
	setup(stimpak) {
		stimpak
		.use(StimpakGit)
		.then(() => {
			if (stimpak.answers().git) {
				this.confirmGithub(stimpak);
			}
		});
	}

	confirmGithub(stimpak) {
		stimpak
		.prompt({
			type: "confirm",
			name: "github",
			message: "Is this project hosted on GitHub?"
		})
		.then(() => {
			if (stimpak.answers().github) {
				stimpak.note("GitHub");
				this.promptGithub(stimpak);
			}
		});
	}

	promptGithub(stimpak) {
		stimpak
		.answers({
			versionControl: true,
			versionControlType: "git"
		})
		.prompt({
			type: "input",
			name: "githubAccountName",
			message: "What is your GitHub account name?",
			default: "MyGithubAccount"
		}, {
			type: "input",
			name: "projectPackageName",
			message: "What is the name of the repository on GitHub?",
			default: "my-package-name"
		}, {
			type: "input",
			name: "repositoryUrl",
			message: "What is your project's GitHub url?",
			default: () => {
				const projectPackageName = stimpak.answers().projectPackageName;
				const githubAccountName = stimpak.answers().githubAccountName;
				const versionControlType = stimpak.answers().versionControlType;

				return `${versionControlType}+https://github.com/${githubAccountName}/${projectPackageName}`
			}
		}, {
			type: "input",
			name: "bugtrackerUrl",
			message: "What is your project's bugtracker url?",
			default: (answers) => {
				const projectPackageName = stimpak.answers().projectPackageName;
				const githubAccountName = stimpak.answers().githubAccountName;
				return `https://github.com/${githubAccountName}/${projectPackageName}/issues`
			}
		}, {
			type: "input",
			name: "homepageUrl",
			message: "What is your project's homepage url?",
			default: (answers) => {
				const projectPackageName = stimpak.answers().projectPackageName;
				const githubAccountName = stimpak.answers().githubAccountName;
				return `https://github.com/${githubAccountName}/${projectPackageName}#readme`
			}
		});
	}

	// promptGithubDetails(stimpak) {
	// 	stimpak
	// 		.prompt();
	// }
}
