import { ItemView } from "obsidian";
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

    const footerContainer = container.createDiv({ cls: "footerContainer" });
    footerContainer.createDiv({ cls: ["withoutCodebarre", 'footerRedCircle'] });
    footerContainer.createEl("p", { text: "If a red circle is displayed just near a element, it's because there isn't codebarre" });
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
        if (element.codebar === "")
          button.createDiv({ cls: "withoutCodebarre" });

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
            console.log("Image updated");
            this.refreshList2(container, containerList, finalList);
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

  refreshList2(container: Element, finalListContainer: Element, finalList: Food[]) {
    finalListContainer.empty();

    finalList.forEach((food: Food) => {
      // Create a div for each food with h2 title and image
      let div = finalListContainer.createDiv({ cls: "food" });

      let divHeader = div.createDiv({ cls: "foodHeader" });
      let a = divHeader.createEl("a", { attr: { href: food?.link, target: "_blank" } });
      let h2 = a.createEl("h2", { text: food?.name });

      if (food.nutriscore_grade === undefined) return;

      let divHeader2 = divHeader.createDiv({ cls: "foodHeader2" });
      divHeader2.createEl("p", { text: `Nutri score : ${food?.nutriscore_grade}`, cls: ["headerFood", (food?.nutriscore_grade === 'A') ? "nutriScoreA" : (food?.nutriscore_grade === 'B') ? "nutriScoreB" : (food?.nutriscore_grade === 'C') ? "nutriScoreC" : (food?.nutriscore_grade === 'D') ? "nutriScoreD" : "nutriScoreE"] });
      divHeader2.createEl("p", { text: `Nova group : ${food?.nova_group}`, cls: ["headerFood", (food?.nova_group === '1') ? "novaGroup1" : (food?.nova_group === '2') ? "novaGroup2" : (food?.nova_group === '3') ? "novaGroup3" : "novaGroup4"] });
      divHeader2.createEl("p", { text: `Eco score : ${food?.ecoscore_grade}`, cls: ["headerFood", (food?.ecoscore_grade === 'A') ? "ecoScoreA" : (food?.ecoscore_grade === 'B') ? "ecoScoreB" : (food?.ecoscore_grade === 'C') ? "ecoScoreC" : (food?.ecoscore_grade === 'D') ? "ecoScoreD" : "ecoScoreE"] });
      divHeader2.createEl("p", { text: `Additives : ${food?.additives}`, cls: ["headerFood", food?.additives?.length === 0 ? "goodCase" : "baseCase"] });

      let divContent = div.createDiv({ cls: "foodContent" });
      divContent.createEl("img", { attr: { src: food?.imagehref }, cls: "foodImage" });
      let divText = divContent.createDiv({ cls: "foodText" });
      divText.createEl("p", { text: 'Quantité : ' + food?.quantity });
      divText.createEl("p", { text: 'Ingrédients : ' + food?.ingredients_n });
      let nutrientLevels = divText.createDiv({ cls: "nutrientLevels" });
      let group1 = nutrientLevels.createDiv({ cls: "group" });
      group1.createSpan({ cls: (food?.nutrient_levels?.fat === 'low') ? "nutrientLevelsSeparatorLow" : (food?.nutrient_levels?.fat === 'high') ? "nutrientLevelsSeparatorHigh" : "nutrientLevelsSeparatorMedium" });
      group1.createEl("p", { text: 'Fat : ' + food?.nutrient_levels?.fat });

      let group2 = nutrientLevels.createDiv({ cls: "group" });
      group2.createSpan({ cls: (food?.nutrient_levels?.salt === 'low') ? "nutrientLevelsSeparatorLow" : (food?.nutrient_levels?.salt === 'high') ? "nutrientLevelsSeparatorHigh" : "nutrientLevelsSeparatorMedium" });
      group2.createEl("p", { text: 'Salt : ' + food?.nutrient_levels?.salt });

      let group3 = nutrientLevels.createDiv({ cls: "group" });
      group3.createSpan({ cls: (food?.nutrient_levels?.['saturated-fat'] === 'low') ? "nutrientLevelsSeparatorLow" : (food?.nutrient_levels?.['saturated-fat'] === 'high') ? "nutrientLevelsSeparatorHigh" : "nutrientLevelsSeparatorMedium" });
      group3.createEl("p", { text: 'Saturated fat : ' + food?.nutrient_levels?.['saturated-fat'] });

      let group4 = nutrientLevels.createDiv({ cls: "group" });
      group4.createSpan({ cls: (food?.nutrient_levels?.sugars === 'low') ? "nutrientLevelsSeparatorLow" : (food?.nutrient_levels?.sugars === 'high') ? "nutrientLevelsSeparatorHigh" : "nutrientLevelsSeparatorMedium" });
      group4.createEl("p", { text: 'Sugars : ' + food?.nutrient_levels?.sugars });

      divText.createEl("p", { text: 'Tableau score : X' });
    });
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
