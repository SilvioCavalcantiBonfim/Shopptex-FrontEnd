import { Product } from '../model/product';

export const Order: {
  [key: string]: (productA: Product, productB: Product) => number;
} = {
  priceAsc: (productA: Product, productB: Product) =>
    productA.price - productB.price,
  priceDesc: (productA: Product, productB: Product) =>
    productB.price - productA.price,
  nameAsc: (productA: Product, productB: Product) =>
    productA.name.localeCompare(productB.name),
  nameDesc: (productA: Product, productB: Product) =>
    productB.name.localeCompare(productA.name),
  none: (productA: Product, productB: Product) => 0,
};
