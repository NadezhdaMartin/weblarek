import './scss/styles.scss';
import { Catalog } from "./components/models/catalog";
import { Cart } from "./components/models/cart";
import { Buyer } from "./components/models/buyer";
import { apiProducts } from "./utils/data";
import { ProductsApi } from "./components/productsApi";
import { Api } from "./components/base/Api"
import { API_URL, CDN_URL } from "./utils/constants";
import { Header } from "../src/components/view/header";
import { EventEmitter } from "../src/components/base/Events";
import { ensureElement, cloneTemplate } from './utils/utils';
import { CardCatalog } from "./components/view/card/cardCatalog";
import { Gallery } from "./components/view/gallery";
import { ModalWindow } from './components/view/modal/modalWindow';
import { CardInModal } from './components/view/card/cardInModal';
import { ModalCart } from './components/view/modal/modalCart';
import { IApiOrderRequest, IApiOrderResponse, IBuyer, IProduct } from './types';
import { CardInCart } from './components/view/card/cardInCart';
import { OrderForm } from './components/view/form/orderForm';
import { ContactsForm } from './components/view/form/contactsForm';
import { OrderSuccessModal } from './components/view/modal/orderSuccessModal';

const events = new EventEmitter();
const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer();
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new ModalWindow(ensureElement<HTMLElement>('.modal'), events);
const cardInModal = new CardInModal(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
const header = new Header(events, ensureElement<HTMLElement>('.header'));
const modalCart = new ModalCart(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
const orderForm = new OrderForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events);
const contactsForm = new ContactsForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events)
const orderSuccessModal = new OrderSuccessModal(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), events)

const api = new Api(API_URL); // Создаём экземпляр класса Api
const productsApi = new ProductsApi(api); // Передаём экземпляр Api в конструктор ProductsApi
productsApi.getProducts()
  .then(data => {
    const itemsWithImageUrl = data.map(item => ({
      ...item,
      image: `${CDN_URL}${item.image}`
    }))
    catalog.saveProductsToStorage(itemsWithImageUrl);
  })
  .catch(err => console.log(err));

//каталог карточек
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
events.on('catalog:changed', () => {
  const itemCards = catalog.getProducts().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render(item);
  });

  gallery.render({ catalog: itemCards });
});

//карточка в модальном окне с описанием и изменения в тексте кнопки
events.on('card:select', (item: IProduct) => {
  const inCart = cart.isProductInCart(item.id);
  let text = '';
  if (item.price == null) {
    text = 'Недоступно'
  } else {
    text = inCart ? 'Удалить из корзины' : 'В корзину'
  }
  const itemWithTextButton = {
    ...item,
    buttonText: text,
  };
  const renderedCard = cardInModal.render(itemWithTextButton);

  modal.content = renderedCard;
});

//закрытие модального окна
events.on('modal:close', () => {
  modal.closeModal();
})

//открывается корзина в модальном окне с добавленными товарами
events.on('cart:open', () => {
  events.emit('cart:changed');//для отображения "корзина пуста" и кнопки "оформить"
  modal.content = modalCart.render();//отрисовывается в главном шаблоне модалки
})

//в корзине отрисовываются карточки товаров и вычисляются данные; emit добавлен в Model на удаление товара, добавление товара, очистка корзины
events.on('cart:changed', () => {
  const products = cart.getCartProducts(); // получаем товары из корзины

  modalCart.cartButtonState = products.length === 0;//кнопка disabled,если true
  //проверка корзина пуста
  if (products.length === 0) {
    modalCart.calculateTotalPrice = 0;
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'Корзина пуста';
    emptyMessage.classList.add('basket__item-empty')
    modalCart.cartItems = [emptyMessage];
  } else {
    //генерируем карточки товара
    const cards = products.map((product, index) => {
      const cardInCart = new CardInCart(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')),events);

      cardInCart.index = index + 1;
      cardInCart.id = product.id;
      cardInCart.title = product.title;
      cardInCart.price = product.price;

      return cardInCart.render();
    });

    modalCart.cartItems = cards; //отрисовали карточки товаров
    modalCart.calculateTotalPrice = cart.getTotalCartCost();
  }
  
  header.counter = cart.getCartProductsCount();//изменяется счетчик товаров на иконке корзины
})

//удаление товара из корзины по кнопке
events.on('product:delete', ({id}: {id: string}) => {
  cart.deleteProductFromCart(id);
})

//кнопка "в корзину" в карточке товара в модальном окне - добавляет в корзину
events.on('cart:toggle', ({ productId }: { productId: string }) => {
  modal.closeModal();
  const product = catalog.getProductById(productId);
  if (!product) {
    console.error('Нет выбранного товара!');
    return;
  }
  const productSelected = cart.isProductInCart(product.id)
  if(productSelected) {
    cart.deleteProductFromCart(product.id)
  } else {
    cart.addProductToCart(product)
  }
})

//переход к форме оплаты
events.on('cart:order', () => {
  modal.content = orderForm.render();
})

//кнопка выбора вида оплаты
events.on('form:change', (data: { field: keyof IBuyer; value: 'card' | 'cash' | '' }) => {
  buyer.saveBuyerInfo({ [data.field]: data.value });

  if (data.field === 'payment') {
    orderForm.payment = data.value;
  }
  
  const validation = buyer.validateData();
  const hasAddressError = !!validation.address;
  const hasPaymentError = !!validation.payment;

  orderForm.submitButtonDisabled = hasAddressError || hasPaymentError;
  orderForm.errors = validation.address || validation.payment || null;
});

//ввод адреса
events.on('form:change', (data: { field: keyof IBuyer; value: string }) => {
  buyer.saveBuyerInfo({ [data.field]: data.value });
  if (data.field === 'address') {
    orderForm.address = data.value;
  }
  
  const validation = buyer.validateData();
  const hasAddressError = !!validation.address;
  const hasPaymentError = !!validation.payment;

  orderForm.submitButtonDisabled = hasAddressError || hasPaymentError;
  orderForm.errors = validation.address || validation.payment || null;
});

//переход к следующей форме
events.on('formSubmit:order', () => {
  modal.content = contactsForm.render();
})

//ввод емеил и телефон
events.on('form:change', (data: { field: keyof IBuyer; value: string }) => {
  buyer.saveBuyerInfo({ [data.field]: data.value });
  if (data.field === 'email') {
    contactsForm.email = data.value;
  }

  if (data.field === 'phone') {
    contactsForm.phone = data.value;
  }
  
  const validation = buyer.validateData();
  const hasEmailError = !!validation.email;
  const hasPhoneError = !!validation.phone;

  contactsForm.submitButtonDisabled = hasEmailError || hasPhoneError;
  contactsForm.errors = validation.email || validation.phone || null;
});

//переход к форме успешного оформления и post-запрос
events.on('formSubmit:contacts', async () => {
  try {
    const buyerInfo = buyer.getBuyerInfo();
    const items = cart.getCartProducts().map(item => item.id);
    const total = cart.getTotalCartCost();
    const orderData: IApiOrderRequest = {
      ...buyerInfo,
      total,
      items,
    };
    const response: IApiOrderResponse = await productsApi.sendOrder(orderData);//Отправляем заказ

    orderSuccessModal.orderSuccessDescription = response.total;
    modal.content = orderSuccessModal.render();
  } catch (error) {
    console.error('Ошибка при отправке заказа:', error);
  }
});

//закрытие модального окна и очистка данных
events.on('successOrderButton:close', () => {
  cart.clearCart();
  buyer.clearBuyerInfo();
  contactsForm.clear();
  orderForm.clear();

  modal.closeModal();
})