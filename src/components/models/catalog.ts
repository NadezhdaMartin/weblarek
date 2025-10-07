import { IProduct } from "../../types/index";


export class Catalog {
    protected products: IProduct[] = [];
    protected product: IProduct | undefined;

    saveProductsToStorage(products: IProduct[]) {
      this.products = products;
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