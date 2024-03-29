import { ItemView, WorkspaceLeaf } from "obsidian";
import { MY_VIEW, NAME_APPLI } from "./constants";
import { objectCheeze } from "./data/cheeze";
import { objectFruit } from "./data/fruit";
import { objectMeat } from "./data/meat";
import { objectOther } from "./data/other";
import { objectStarches } from "./data/starches";
import { objectVegetables } from "./data/vegetables";
import { Category } from "./interface/category";

export class CourseTracker extends ItemView {
  constructor(leaf: any) {
    super(leaf);
  }

  // Cette méthode retourne l'ID de la vue. Obsidian l'utilise pour identifier la vue.
  getViewType() {
    return MY_VIEW;
  }

  // Cette méthode retourne le nom affiché dans l'interface utilisateur d'Obsidian, comme l'onglet de la vue.
  getDisplayText() {
    return NAME_APPLI;
  }

  async onOpen() {
    const finalList: String[] = [];

    const container: Element = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Course Tracker" });

    this.displayObject(container, finalList);
    this.createLine(container);
    this.createFinalList(container, finalList)
  }

  // Crée une ligne horizontale
  createLine(container: Element) {
    const hr = container.createEl("hr");
    hr.style.margin = "10px 0 10px 0";
  }

  // Initialise les catégories et les éléments de chaque catégorie
  initObject(): Category[] {
    const allObject: Category[] = [];

    allObject.push(objectMeat);
    allObject.push(objectFruit);
    allObject.push(objectVegetables);
    allObject.push(objectStarches);
    allObject.push(objectCheeze);
    allObject.push(objectOther);

    return allObject;
  }

  // Affiche les catégories et les éléments de chaque catégorie
  displayObject(container: Element, finalList: String[]) {
    const allObject: Category[] = this.initObject();

    allObject.forEach((category, _) => {
      let h1 = container.createEl("h1", { text: category.name });
      h1.style.margin = "5px";
      h1.style.fontSize = "20px";

      // Pour chaque élément, crée un bouton qui, lorsqu'il est cliqué, l'ajoute ou le supprime de la liste finale
      category.array.forEach((element, index) => {
        let button = container.createEl("button", { text: element });
        button.style.margin = "5px";

        button.onclick = function () {
          // Si l'élément est déjà dans la liste, on le retire
          if (finalList.includes(element)) {
            finalList.splice(finalList.indexOf(element), 1);
            button.style.backgroundColor = ""; // not selected
          } else { // Sinon, on l'ajoute à la liste
            finalList.push(element);
            button.style.backgroundColor = "green"; // selected
          }
        };
      });
      this.createLine(container);
    });
  }

  // Crée un conteneur pour la liste finale et affiche les boutons
  createFinalList(container: Element, finalList: String[]) {
    // Création d'un conteneur pour la liste finale
    let finalListContainer = container.createDiv();
    finalListContainer.id = "finalListContainer"; // Ajout d'un ID pour faciliter l'accès ultérieurement

    // Ajouter un bouton pour afficher la liste finale dans la console ou où vous le souhaitez
    let showFinalListButton = container.createEl("button", { text: "Display list" });
    showFinalListButton.style.margin = "5px";
    showFinalListButton.style.backgroundColor = "#c78100";
    showFinalListButton.style.fontSize = "1rem";
    showFinalListButton.style.fontFamily = "Cascadia";

    showFinalListButton.onclick = function () {
      // Vide le conteneur avant d'ajouter les éléments de la liste finale
      finalListContainer.innerHTML = '';

      // Crée une liste à puces pour les éléments de la liste finale
      let ul = container.createEl("ul");
      finalList.forEach(item => {
        let li = container.createEl("li");

        // Crée la case à cocher
        let checkbox = container.createEl("input", { type: "checkbox" });
        checkbox.id = item as string;
        checkbox.name = item as string;

        // Crée un label pour la case à cocher
        let label = container.createEl("label");
        label.htmlFor = item as string;
        label.appendChild(document.createTextNode(item as string));

        // Ajoute la case à cocher et le label au li, puis ajoute le li au ul
        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
      });
      finalListContainer.appendChild(ul);

      // Si la liste est vide, affiche un message
      if (finalList.length === 0) {
        finalListContainer.textContent = "List is empty !";
      }
    };

    let cleanListButton = container.createEl("button", { text: "Clean list" });
    cleanListButton.style.margin = "5px";

    // Clean fonction
    cleanListButton.onclick = () => {
      // Réinitialise l'état de tous les boutons
      Array.from(this.contentEl.querySelectorAll("button")).forEach(button => {
        if (finalList.includes(String(button.textContent))) {
          button.style.backgroundColor = ""; // réinitialise la couleur d'arrière-plan
        }
      });

      // Vide la liste finale
      finalList.length = 0;

      // Vide le conteneur de la liste finale
      finalListContainer.innerHTML = '';
    };
  }
}
