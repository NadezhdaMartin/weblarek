import { TProductsFromServer, IPurchaseData } from "../types/index";
import { Api } from "./base/Api"

export class ProductsApi extends Api {
    getProducts(): Promise<TProductsFromServer[]> {
      return this.get<TProductsFromServer[]>('/product/');
    }

    addPurchaseData(data: Partial<IPurchaseData>): Promise<IPurchaseData> {
      return this.post<IPurchaseData>('/order/', data);
    }
}