import { Component } from "../../base/Component";
import { EventEmitter } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

interface IModalCart {
  calculateTotalPrice: number;
}

export class ModalCart extends Component<IModalCart> {
  protected cartButton: HTMLButtonElement;
  protected totalPrice: HTMLElement;
  protected listContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.cartButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
    this.listContainer = ensureElement<HTMLElement>('.basket__list', this.container);

    this.cartButton.addEventListener('click', () => {
      this.events.emit('cart:order');
    })
  }

  set calculateTotalPrice(value: number) {
    this.totalPrice.textContent = `${String(value)} синапсов`;
  }

  set cartItems(cards: HTMLElement[]) {
    this.listContainer.replaceChildren(...cards);
  }

  set cartButtonState(isEmpty: boolean) {
    if (isEmpty) {
      this.cartButton.disabled = true;
    } else {
      this.cartButton.disabled = false;
    }
  }
}