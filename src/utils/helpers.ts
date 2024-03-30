import { Food } from '../class/food';

export function containsFoodWithCodebar(finalList: Food[], codebar: string) {
  return finalList.some(food => food.codebar === codebar);
}

// Vérifier l'index d'un élément par son nom dans finalList
export function indexOfFoodByName(finalList: Food[], name: string) {
  return finalList.findIndex(food => food.name === name);
}
