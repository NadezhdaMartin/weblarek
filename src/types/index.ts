export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export type TPayment = 'card' | 'cash' | '';

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TErrors = Partial<Record<keyof IBuyer, string>>;

export type TProductFromServer = IProduct;

export interface IApiProductsResponse<Type> {
    total: number,
    items: Type[]
}

export interface IApiOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IApiOrderResponse {
    id: string;
    total: number;
}
