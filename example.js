const createParagraphe = (value, size = '12px') => {
  let infosProduct = document.createElement("p");

  infosProduct.style.fontSize = size;
  infosProduct.id = value;
  infosProduct.margin = 0;
  infosProduct.padding = 0;
  infosProduct.name = value;
  infosProduct.value = value;
  infosProduct.innerHTML = value;

  return infosProduct;
}

const createParagrapheWithURL = (value, URL, size = '12px') => {
  let infosProduct = document.createElement("p");

  infosProduct.style.fontSize = size;
  infosProduct.id = value;
  infosProduct.name = value;
  infosProduct.value = value;
  infosProduct.innerHTML = value;

  let aHtml = document.createElement("a");

  infosProduct.style.fontSize = size;
  infosProduct.id = value;
  infosProduct.name = value;
  infosProduct.value = URL;
  infosProduct.innerHTML = URL;
  infosProduct.href = URL;

  infosProduct.appendChild(aHtml);

  return infosProduct;
}

const allObject = [];
const objectMeat = {
  name: 'Meat',
  array: ['Jambon', 'Saumon', 'Poulet', 'Steak haché', 'Dinde', 'Oeuf']
}
allObject.push(objectMeat);

const objectFruit = {
  name: 'Fruit',
  array: ['Orange', 'Poire', 'Pomme', 'Banane', 'Mangue']
}
allObject.push(objectFruit);

const objectVegetables = {
  name: 'Vegetables',
  array: ['Salade', 'Epinards', 'Brocoli', 'Oignon blanc', 'Oignon rouge', 'Champignon', 'Carotte', 'Avocat', 'Concombre', 'Tomate', 'Tomate cerise']
}
allObject.push(objectVegetables);

const objectStarches = {
  name: 'Starches',
  array: ['Pâte pour wrap', 'Riz complet', 'Pâtes complètes', 'Potato', 'Sweet potato']
}
allObject.push(objectStarches);

const objectCheeze = {
  name: 'Cheeze',
  array: ['Fromage à pâte dur', 'Fromage blanc', 'Crème fraiche']
}
allObject.push(objectCheeze);

const objectOther = {
  name: 'No category',
  array: ['Quinoa', 'Houmous', 'Tapenade', 'Eau pétillante', 'PQ']
}
allObject.push(objectOther);

const finalList = [];
allObject.forEach((category, _) => {
  let h1 = document.createElement("h1");

  h1.textContent = category.name;
  h1.style.margin = "5px";
  h1.style.fontSize = "20px";

  dv.container.appendChild(h1);

  // Pour chaque élément, crée un bouton qui, lorsqu'il est cliqué, l'ajoute ou le supprime de la liste finale
  category.array.forEach((element, index) => {
    let button = document.createElement("button");

    button.textContent = element;
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

    // Ajoute le bouton au conteneur DataviewJS
    dv.container.appendChild(button);
  });
  dv.paragraph('---');
});

// Création d'un conteneur pour la liste finale
let finalListContainer = document.createElement("div");
finalListContainer.id = "finalListContainer"; // Ajout d'un ID pour faciliter l'accès ultérieurement

let cleanListButton = document.createElement("button");
cleanListButton.style.margin = "5px";
cleanListButton.textContent = "Clear list";
// Clean fonction
cleanListButton.onclick = function () {
  // Réinitialise l'état de tous les boutons
  document.querySelectorAll("button").forEach(button => {
    if (finalList.includes(button.textContent)) {
      button.style.backgroundColor = ""; // not selected
    }
  });

  // Vide la liste finale
  finalList.length = 0;

  // Vide le conteneur de la liste finale
  finalListContainer.innerHTML = '';
};

// Ajouter un bouton pour afficher la liste finale dans la console ou où vous le souhaitez
let showFinalListButton = document.createElement("button");
showFinalListButton.style.margin = "5px";
showFinalListButton.textContent = "Display list";
showFinalListButton.onclick = function () {
  // Vide le conteneur avant d'ajouter les éléments de la liste finale
  finalListContainer.innerHTML = '';

  // Crée une liste à puces pour les éléments de la liste finale
  let ul = document.createElement("ul");
  finalList.forEach(item => {
    let li = document.createElement("li");

    // Crée la case à cocher
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;
    checkbox.name = item;
    checkbox.value = item;

    // Crée un label pour la case à cocher
    let label = document.createElement("label");
    label.htmlFor = item;
    label.appendChild(document.createTextNode(item));

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

  dv.io.load("json/products.json").then(data => {
    dv.paragraph('---');

    console.log('data : ', JSON.parse(data));
    let dataParsed = JSON.parse(data);

    // Now it's not working corretly, need to fix it
    return

    for (let index = 0; index < finalList.length; index++) {
      let item = finalList[index];
      if (dataParsed[item.toLowerCase()] === undefined) {
        dv.container.appendChild(createParagraphe(item.toLowerCase() + " : No codebarre !", '4px'));
        continue;
      }
      dv.container.appendChild(createParagraphe(dataParsed[item.toLowerCase()]?.name, '40px'));
      dv.paragraph('https://fr.openfoodfacts.org/produit/' + dataParsed[item.toLowerCase()]?.code.toString());

      dv.container.appendChild(createParagraphe("ecoscore_grade : " + dataParsed[item.toLowerCase()]?.ecoscore_grade.toString()));

      dv.container.appendChild(createParagraphe("nova_group : " + dataParsed[item.toLowerCase()]?.nova_group.toString()));

      dv.container.appendChild(createParagraphe("nutriscore_grade : " + dataParsed[item.toLowerCase()]?.nutriscore_grade.toString()));

      dv.container.appendChild(createParagraphe("nutrient_levels : ['fat' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.fat + ", 'salt' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.salt + ", 'saturated-fat' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.salt + ", 'sugars' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.sugars + "]"));

    };

    //dv.container.appendChild(moreInformation);
  });
};

dv.container.appendChild(showFinalListButton);
dv.container.appendChild(cleanListButton);
dv.container.appendChild(finalListContainer);