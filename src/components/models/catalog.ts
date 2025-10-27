import { IProduct } from "../../types/index";
import { IEvents } from "../base/Events";


export class Catalog {
    protected products: IProduct[] = [];
    protected product: IProduct | undefined;

    constructor(protected events: IEvents) {}

    saveProductsToStorage(products: IProduct[]) {
      this.products = products;
      this.events.emit('catalog:changed');
    }

    getProducts(): IProduct[] {
      return this.products;
    }

    getProductById(id: string): IProduct | undefined {
      return this.products.find(product => product.id === id);
    }

    saveProductToStorage(product: IProduct) {
      this.product = product;
    }

    getProduct(): IProduct | undefined {
      return this.product;
    }
}