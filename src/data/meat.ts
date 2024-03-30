import { Category } from "src/interface/category";
import { Food } from "src/class/food";

export const objectMeat: Category = {
  name: 'Meat',
  array: [
    new Food('Jambon', '3302740047374'),
    new Food('Saumon', '3256220174848'),
    new Food('Poisson pané', '3266980138721'),
    new Food('Oeuf', '3256224255055'),
    new Food('Poulet', ''),
    new Food('Steak haché', ''),
    new Food('Dinde', ''),
  ]
}
