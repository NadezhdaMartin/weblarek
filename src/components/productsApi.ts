import { TProductFromServer, IApiProductsResponse, IApiOrderRequest, IApiOrderResponse } from "../types/index";
import { Api } from "./base/Api"


export class ProductsApi {
    private api: Api;

    constructor(api: Api) {
      this.api = api;
    }

    getProducts(): Promise<TProductFromServer[]> {
      return this.api.get<IApiProductsResponse<TProductFromServer>>('/product/').then((data) =>
      data.items);
    }

    sendOrder(data: IApiOrderRequest): Promise<IApiOrderResponse> {
      return this.api.post<IApiOrderResponse>('/order', data);
    }
}