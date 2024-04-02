interface NutrientsLevels {
  fat: string;
  salt: string;
  'saturated-fat': string;
  sugars: string;
}

export class Food {
  name: string;
  codebar: string;
  imagehref: string;
  quantity: number;
  ecoscore_grade: string;
  nova_group: string;
  nutriscore_grade: string;
  nutrient_levels: NutrientsLevels;
  additives: string[];
  ingredients_n: number;
  link: string;


  constructor(name: string, codebar: string) {
    this.name = name;
    this.codebar = codebar;
    this.imagehref = 'https://static.vecteezy.com/ti/vecteur-libre/p1/6253524-icone-de-point-d-interrogation-gratuit-vectoriel.jpg';
  }

  async getApi(): Promise<any> {
    if (this.codebar === '') {
      console.log('Codebar is empty');
      return null;
    }

    const url = `https://world.openfoodfacts.org/api/v2/product/${this.codebar}.json`;

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    this.imagehref = result?.product?.image_front_url;
    this.quantity = result?.product?.quantity;
    this.ecoscore_grade = result?.product?.ecoscore_grade?.toString().toUpperCase();
    this.nova_group = result?.product?.nova_group?.toString().toUpperCase();
    this.nutriscore_grade = result?.product?.nutriscore_grade?.toString().toUpperCase();
    this.nutrient_levels = result?.product?.nutrient_levels;
    this.additives = result?.product?.additives_tags;
    this.ingredients_n = result?.product?.ingredients_n;
    this.link = 'https://fr.openfoodfacts.org/produit/' + this.codebar.toString();

    return result;
  }
}