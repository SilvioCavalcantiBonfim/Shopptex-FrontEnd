import { Info } from "./info"
import { Product } from "./product"

export type Shop = {
  info: Info,
  products: Product[]
}

export const nullShop = {
  info: new Info('', '#DE7B29', '', ''),
  products: [] as Product[],
};
