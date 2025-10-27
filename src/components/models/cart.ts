import { IProduct } from "../../types/index";
import { IEvents } from "../base/Events";

export class Cart {
    protected cartProducts: IProduct[] = [];

    constructor(protected events: IEvents) {}

    getCartProducts(): IProduct[] {
      return this.cartProducts;
    }

    addProductToCart(product: IProduct) {
      this.cartProducts.push(product);
      this.events.emit('cart:changed');
    }

    deleteProductFromCart(id: string) {
      this.cartProducts = this.cartProducts.filter(product => product.id !== id);
      this.events.emit('cart:changed');
    }

    clearCart() {
      this.cartProducts = [];
      this.events.emit('cart:changed');
    }

    getTotalCartCost(): number {
      return this.cartProducts.reduce((acc, product) => {return acc + (product.price === null ? 0 : product.price);}, 0);
    }

    getCartProductsCount(): number {
      return this.cartProducts.length;
    }

    isProductInCart(id: string): boolean {
      return this.cartProducts.some(product => product.id === id);
    }
}