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

  // This method returns the view ID. Obsidian uses it to identify the view.
  getViewType() {
    return MY_VIEW;
  }

  // This method returns the name displayed in the Obsidian UI, like the view's tab.
  getDisplayText() {
    return NAME_APPLI;
  }

  // This method is called when the view is opened.
  async onOpen() {
    const finalList: String[] = [];

    const container: Element = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Course Tracker" });

    this.displayObject(container, finalList);
    this.createLine(container);
    this.createFinalList(container, finalList)
  }

  // Create a horizontal line
  createLine(container: Element) {
    container.createEl("hr");
  }

  // Initialize categories and elements of each category
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

  // Display categories and elements
  displayObject(container: Element, finalList: String[]) {
    const allObject: Category[] = this.initObject();

    allObject.forEach((category, _) => {
      container.createEl("h1", { text: category.name });

      // For each element in the category, create a button
      category.array.forEach((element, index) => {
        let button = container.createEl("button", { text: element });

        button.onclick = function () {
          // If the element is already in the list, remove it
          if (finalList.includes(element)) {
            finalList.splice(finalList.indexOf(element), 1);
            button.toggleClass("selected", false);
          } else { // Instead, add it to the list
            finalList.push(element);
            button.toggleClass("selected", true);
          }
        };
      });
      this.createLine(container);
    });
  }

  // Create the final list
  createFinalList(container: Element, finalList: String[]) {
    let finalListContainer = container.createDiv();

    let showFinalListButton = container.createEl("button", { text: "Display list", cls: "showFinalListButton" });

    showFinalListButton.onclick = function () {
      finalListContainer.empty();

      let ul = container.createEl("ul");
      finalList.forEach(item => {
        let li = container.createEl("li");

        let checkbox = container.createEl("input", { type: "checkbox" });
        checkbox.id = item as string;
        checkbox.name = item as string;

        let label = container.createEl("label");
        label.htmlFor = item as string;
        label.appendChild(document.createTextNode(item as string));

        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
      });
      finalListContainer.appendChild(ul);

      // If list is empty, return this
      if (finalList.length === 0) {
        finalListContainer.createEl('p', { text: "Please select an item to display the list." });
      }
    };

    let clearListButton = container.createEl("button", { text: "Clear list" });

    // Clear function
    clearListButton.onclick = () => {
      Array.from(this.contentEl.querySelectorAll("button")).forEach(button => {
        if (finalList.includes(String(button.textContent))) {
          button.toggleClass("selected", false);
        }
      });

      finalList.length = 0;
      finalListContainer.empty();
    };
  }
}
