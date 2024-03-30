import { Food } from "src/class/food";
import { Category } from "src/interface/category";

export const objectCheeze: Category = {
  name: 'Cheeze',
  array: [
    new Food('Fromage à pâte dur', ''),
    new Food('Fromage blanc / Mozzarela 125g', '3256224310075'),
    new Food('Crème fraiche 25 cl', '3262970703047'),
    new Food('Beurre demi-sel', '3412290015997'),
    new Food('Emmental 300 g', '3123930711758'),
  ]
}