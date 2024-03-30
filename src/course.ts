import { ItemView, WorkspaceLeaf } from "obsidian";
import { MY_VIEW, NAME_APPLI } from "./constants";
import { objectCheeze } from "./data/cheeze";
import { objectFruit } from "./data/fruit";
import { objectMeat } from "./data/meat";
import { objectOther } from "./data/other";
import { objectStarches } from "./data/starches";
import { objectVegetables } from "./data/vegetables";
import { Category } from "./interface/category";
import { Food } from "./class/food";
import { containsFoodWithCodebar, indexOfFoodByName } from "./utils/helpers";

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
    const finalList: Food[] = [];

    const container: Element = this.containerEl.children[1];
    container.empty();
    container.createEl("h1", { text: "Course Tracker" });

    const containerCenter = container.createDiv({ cls: "containerCenter" });

    const containerDivLeft = containerCenter.createDiv({ cls: "containerDivLeft" });
    const containerDivRight = containerCenter.createDiv({ cls: "containerDivRight" });
    containerDivLeft.createEl("h1", { text: "Select your food" });
    containerDivRight.createEl("h1", { text: "Food selected" });

    this.createLine(containerDivLeft);
    this.createLine(containerDivRight);

    this.displayObject(containerDivLeft, containerDivRight, finalList);
    this.createLine(containerDivLeft);
    this.createFinalList(containerDivLeft, finalList)
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
  displayObject(container: Element, containerList: Element, finalList: Food[]) {
    const allObject: Category[] = this.initObject();

    allObject.forEach((category, _) => {
      container.createEl("h1", { text: category.name });

      // For each element in the category, create a button
      category.array.forEach((element: Food, _) => {
        let button = container.createEl("button", { text: element.name });

        button.onclick = () => {
          // If the element is already in the list, remove it
          if (containsFoodWithCodebar(finalList, element.codebar)) {
            finalList.splice(indexOfFoodByName(finalList, element.name), 1);
            button.toggleClass("selected", false);
          } else { // Instead, add it to the list
            finalList.push(element);
            button.toggleClass("selected", true);
          }

          element.getApi().then((_) => {
            this.refreshList(container, containerList, finalList);
          });
        };
      });
      this.createLine(container);
    });
  }

  refreshList(container: Element, finalListContainer: Element, finalList: Food[]) {
    finalListContainer.empty();

    let ul = container.createEl("ul");
    finalList.forEach((food: Food) => {
      let li = container.createEl("li");

      let checkbox = container.createEl("input", { type: "checkbox" });
      checkbox.id = food.name;
      checkbox.name = food.name;

      let label = container.createEl("label");
      label.htmlFor = food.name;
      label.appendChild(document.createTextNode(food.name));

      li.appendChild(checkbox);
      li.appendChild(label);
      ul.appendChild(li);
    });
    finalListContainer.appendChild(ul);
  }

  // Create the final list
  createFinalList(container: Element, finalList: Food[]) {
    const finalListContainer = container.createDiv();

    let showFinalListButton = container.createEl("button", { text: "Display list", cls: "showFinalListButton" });

    showFinalListButton.onclick = () => {
      this.refreshList(container, finalListContainer, finalList);

      // If list is empty, return this
      if (finalList.length === 0) {
        finalListContainer.createEl('p', { text: "Please select an item to display the list." });
      }
    };

    let clearListButton = container.createEl("button", { text: "Clear list" });

    // Clear function
    clearListButton.onclick = () => {
      Array.from(this.contentEl.querySelectorAll("button")).forEach(button => {
        if (containsFoodWithCodebar(finalList, String(button.textContent))) {
          button.toggleClass("selected", false);
        }
      });

      finalList.length = 0;
      finalListContainer.empty();
    };
  }
}
