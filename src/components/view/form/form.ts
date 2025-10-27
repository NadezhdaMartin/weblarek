import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm {
  submitButtonDisabled: boolean;
  errors: string | null;
}

export abstract class Form<IForm> extends Component<IForm> {
  protected formErrors: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
  }

  // Блокировка/разблокировка кнопки отправки
  set submitButtonDisabled(value: boolean) {
    this.submitButton.disabled = value;
  }

  // Отображение ошибок под формой
  set errors(errors: string | null) {
    this.formErrors.textContent = errors || '';
  }

  //сообщает об изменениях в поле ввода
  protected onInputChange(field: keyof IBuyer, value: string | null) {
    this.events.emit('form:change', {
      field,
      value,
    });
  }
}