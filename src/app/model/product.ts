export class Product {
  readonly name: string;
  readonly photo: string;
  readonly price: number;
  readonly is_promotion: boolean;
  constructor(
    name: string,
    photo: string,
    price: number,
    is_promotion: boolean
  ) {
    this.name = name;
    this.photo = photo;
    this.price = price;
    this.is_promotion = is_promotion;
  }
}
