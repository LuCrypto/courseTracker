import { Food } from "src/class/food";
import { Category } from "src/interface/category";

export const objectStarches: Category = {
  name: 'Starches',
  array: [
    new Food('Pâte pour wrap', ''),
    new Food('Riz complet', ''),
    new Food('Pâtes complètes', ''),
    new Food('Potato', ''),
    new Food('Sweet potato', ''),
  ]
}