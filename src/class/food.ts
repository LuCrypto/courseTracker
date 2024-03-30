
export class Food {
  name: string;
  codebar: string;
  imagehref: string;

  constructor(name: string, codebar: string) {
    this.name = name;
    this.codebar = codebar;
    this.imagehref = '';
  }

  async getApi(): Promise<any> {
    const url = `https://world.openfoodfacts.org/api/v2/product/${this.codebar}.json`;

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    this.imagehref = result.product.image_front_url;
    return result;
  }
}