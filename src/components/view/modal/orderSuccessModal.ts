import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

interface IModalOrderSuccess {
  orderSuccessDescription: number;
}

export class OrderSuccessModal extends Component<IModalOrderSuccess> {
  protected descriptionElement: HTMLElement;
  protected orderSuccessCloseButton: HTMLButtonElement;
  
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.orderSuccessCloseButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
  
    this.orderSuccessCloseButton.addEventListener('click', () => {
      this.events.emit('successOrderButton:close');
    });
  }
  
  set orderSuccessDescription(value: number) {
    this.descriptionElement.textContent = `Списано ${String(value)} синапсов`;
  }
}