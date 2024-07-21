import { Product } from "../model/product";

  export const filters: {[key: string]: (product: Product) => boolean} = {
    'promotion': (product: Product) => product.is_promotion
  }
