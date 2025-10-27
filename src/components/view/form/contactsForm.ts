import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./form";

interface IContactsForm {
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
  protected contactsButton: HTMLButtonElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    this.contactsButton = ensureElement<HTMLButtonElement>('.button', this.container);

    this.emailInput.addEventListener('input', () => {
      const field = 'email';
      const value = this.emailInput.value;
      this.onInputChange(field, value);
    });

    this.phoneInput.addEventListener('input', () => {
      const field = 'phone';
      const value = this.phoneInput.value;
      this.onInputChange(field, value);
    });

    this.contactsButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.events.emit('formSubmit:contacts');
    })
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }

  clear() {
    this.email = '';
    this.phone = '';
  }
}