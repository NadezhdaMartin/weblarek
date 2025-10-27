import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./form";

interface IOrderForm {
  address: string;
  payment: 'card' | 'cash' | '';
}

export class OrderForm extends Form<IOrderForm> {
  protected paymentCashButton: HTMLButtonElement;
  protected paymentCardButton: HTMLButtonElement;
  protected orderButton: HTMLButtonElement;
  protected adressInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.paymentCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.paymentCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.adressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.orderButton = ensureElement<HTMLButtonElement>('.order__button', this.container);

    this.paymentCashButton.addEventListener('click', () => {
        const field = 'payment';
        const value = this.paymentCashButton.getAttribute('name');
        this.onInputChange(field, value);
    });

    this.paymentCardButton.addEventListener('click', () => {
        const field = 'payment';
        const value = this.paymentCardButton.getAttribute('name');
        this.onInputChange(field, value);
    });

    this.adressInput.addEventListener('input', () => {
      const field = 'address';
      const value = this.adressInput.value;
      this.onInputChange(field, value);
    });

    this.orderButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.events.emit('formSubmit:order');
    })
  }

  set payment(activeMethod: 'card' | 'cash' | '') {
    this.paymentCashButton.classList.toggle('button_alt-active', activeMethod === 'cash');
    this.paymentCardButton.classList.toggle('button_alt-active', activeMethod === 'card');
  }

  set address(value: string) {
    this.adressInput.value = value;
  }

  clear() {
    this.address = '';
    this.payment = '';
  }
}

