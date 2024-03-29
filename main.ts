import { Plugin, ItemView, WorkspaceLeaf } from 'obsidian'
import { MY_VIEW, NAME_APPLI } from './src/constants'
import { CourseTracker } from 'src/course';

// Créez une classe pour votre plugin
class MonPlugin extends Plugin {
	async onload() {
		// Nous ajoutons notre vue personnalisée à l'application
		this.registerView(
			MY_VIEW,
			(leaf) => new CourseTracker(leaf)
		);

		// Ajoutez un élément de menu pour ouvrir votre vue personnalisée
		this.addRibbonIcon('dice', NAME_APPLI, () => {
			this.activateView();
		});
	}

	async onunload() {
	}

	async activateView() {
		// Cette fonction tente d'ouvrir la vue dans un nouvel onglet
		this.app.workspace.detachLeavesOfType(MY_VIEW);
		await this.app.workspace.getLeaf(true).setViewState({
			type: MY_VIEW,
		});
	}
}

// Cela enregistre votre plugin au sein d'Obsidian.
module.exports = MonPlugin;