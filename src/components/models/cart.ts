import { IProduct } from "../../types/index";

export class Cart {
    protected cartProducts: IProduct[] = [];

    getCartProducts(): IProduct[] {
      return this.cartProducts;
    }

    addProductToCart(product: IProduct) {
      this.cartProducts.push(product);
    }

    deleteProductFromCart(id: string) {
      this.cartProducts = this.cartProducts.filter(product => product.id !== id);
    }

    clearCart() {
      this.cartProducts = [];
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