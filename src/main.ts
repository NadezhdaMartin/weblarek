import './scss/styles.scss';
import { Catalog } from "./components/models/catalog";
import { Cart } from "./components/models/cart";
import { Buyer } from "./components/models/buyer";
import { apiProducts } from "./utils/data";
import { ProductsApi } from "./components/productsApi";
import { Api } from "./components/base/Api"
import { API_URL } from "./utils/constants";

const catalog = new Catalog();
catalog.saveProductsToStorage(apiProducts.items)
console.log('Массив товаров из каталога: ', catalog.getProducts())
console.log('получили товар по id', catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"))
catalog.saveProductToStorage(catalog.getProducts()[3])//сохраняем товар - один из товаров массива
console.log('Проверяем сохранение товара', catalog.getProduct())

const cart = new Cart();
cart.addProductToCart(catalog.getProducts()[1]);
cart.addProductToCart(catalog.getProducts()[3]);
console.log('Получили корзину с добавленными товарами', cart.getCartProducts())
cart.deleteProductFromCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
console.log('Удалили по id товар из корзины', cart.getCartProducts())
cart.clearCart()
console.log('Удалили всё из корзины', cart.getCartProducts())
cart.addProductToCart(catalog.getProducts()[1]);
cart.addProductToCart(catalog.getProducts()[3]);
console.log('Стоимость товаров в корзине', cart.getTotalCartCost())
console.log('Количество товаров в корзине', cart.getCartProductsCount())
console.log('Есть ли товар в корзине', cart.isProductInCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"))

const buyer = new Buyer();
buyer.saveBuyerInfo({payment: 'card', email: 'nadej@mail.ru', address: 'Lenin 99' })//Добавили информацию о покупателе
console.log("Получили информацию о покупателе" , buyer.getBuyerInfo())
buyer.saveBuyerInfo({phone: '+79999'})//Добавили новую информацию о покупателе
console.log("Проверили, что данные не удалились - записывается только переданный параметр" , buyer.getBuyerInfo())
buyer.clearBuyerInfo()//Очистили информацию о покупателе
console.log("Удалили информацию о покупателе" , buyer.getBuyerInfo())
buyer.saveBuyerInfo({email: 'nadej@mail.ru'})//Добавили информацию о покупателе
console.log("Возвращает объект с ошибками", buyer.validateData())

const api = new Api(API_URL); // Создаём экземпляр класса Api
const productsApi = new ProductsApi(api); // Передаём экземпляр Api в конструктор ProductsApi
productsApi.getProducts()
  .then(data => {
    catalog.saveProductsToStorage(data);
    console.log('Массив товаров, полученный с сервера ', catalog.getProducts());
  })
  .catch(err => console.log(err));