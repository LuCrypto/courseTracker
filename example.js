// dv.io.load("json/products.json").then(data => {
//   dv.paragraph('---');

//   console.log('data : ', JSON.parse(data));
//   let dataParsed = JSON.parse(data);

//   // Now it's not working corretly, need to fix it
//   return

//   for (let index = 0; index < finalList.length; index++) {
//     let item = finalList[index];
//     if (dataParsed[item.toLowerCase()] === undefined) {
//       dv.container.appendChild(createParagraphe(item.toLowerCase() + " : No codebarre !", '4px'));
//       continue;
//     }
//     dv.container.appendChild(createParagraphe(dataParsed[item.toLowerCase()]?.name, '40px'));
//     dv.paragraph('https://fr.openfoodfacts.org/produit/' + dataParsed[item.toLowerCase()]?.code.toString());

//     dv.container.appendChild(createParagraphe("ecoscore_grade : " + dataParsed[item.toLowerCase()]?.ecoscore_grade.toString()));

//     dv.container.appendChild(createParagraphe("nova_group : " + dataParsed[item.toLowerCase()]?.nova_group.toString()));

//     dv.container.appendChild(createParagraphe("nutriscore_grade : " + dataParsed[item.toLowerCase()]?.nutriscore_grade.toString()));

//     dv.container.appendChild(createParagraphe("nutrient_levels : ['fat' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.fat + ", 'salt' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.salt + ", 'saturated-fat' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.salt + ", 'sugars' : " + dataParsed[item.toLowerCase()]?.nutrient_levels?.sugars + "]"));

//   };

//   //dv.container.appendChild(moreInformation);
// });
