import './scss/styles.scss';
import { Catalog } from "./components/models/catalog";
import { Cart } from "./components/models/cart";
import { Buyer } from "./components/models/buyer";
import { apiProducts } from "./utils/data";
import { ProductsApi } from "./components/productsApi";

const catalog = new Catalog();
catalog.saveProductsToStorage(apiProducts.items)
console.log('Массив товаров из каталога: ', catalog.getProducts())
console.log('получили товар по id', catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"))
const testProduct = {
  id: 'test-id',
  description: 'Test description',
  image: 'test-image',
  title: 'Test title',
  category: 'Test category',
  price: 100
};
catalog.saveProductToStorage(testProduct)//сохраняем товар
console.log('Проверяем сохранение товара', catalog.getProducts())

const cart = new Cart();
cart.addProductToCart({ "id": "оооба",
            "description": "щдщ",
            "image": "/5_Dots.svg",
            "title": "+ааа",
            "category": "софт-скил",
            "price": null }
);
cart.addProductToCart(
  { "id": "ууу",
            "description": "пкии",
            "image": "/5_Dots.svg",
            "title": "ьо",
            "category": "софт-скил",
            "price": 210 }
);
console.log('Получили корзину', cart.getCartProducts())
// cart.deleteProductFromCart("ууу")
// console.log('Удалили по id товар из корзины', cart.getCartProducts())
// cart.clearCart()
// console.log('Удалили всё из корзины', cart.getCartProducts())
console.log('Стоимость товаров в корзине', cart.getTotalCartCost())
console.log('Количество товаров в корзине', cart.getCartProductsCount())
console.log('Есть ли товар в корзине', cart.isProductInCart("оооба"))

const buyer = new Buyer();
buyer.saveBuyerInfo("", "nade@mail.ru", "", "Lenin 99")//Добавили информацию о покупателе
console.log("Получили информацию о покупателе" , buyer.getBuyerInfo())
// buyer.clearBuyerInfo()//Очистили информацию о покупателе
// console.log("Удалили информацию о покупателе" , buyer.getBuyerInfo())
console.log("Возвращает объект с ошибками", buyer.validateData())

const api = new ProductsApi('https://larek-api.nomoreparties.co/api/weblarek');
api.getProducts()
  .then(data => {
    catalog.saveProductsToStorage(data)
    console.log(catalog)
  })
  .catch(err => console.log(err))
console.log('Массив товаров, полученный с сервера ', catalog.getProducts())