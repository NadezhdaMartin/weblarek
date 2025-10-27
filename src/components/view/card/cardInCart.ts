import { Card } from "./card";
import { ensureElement } from "../../../utils/utils";
import { ICardData } from "./card";
import { EventEmitter } from "../../base/Events";

export class CardInCart extends Card<ICardData> {
  protected indexProduct: HTMLElement;
  protected deleteCard: HTMLButtonElement;
  protected productId: string = '';

    constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.deleteCard = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.indexProduct = ensureElement<HTMLElement>('.basket__item-index', this.container);

    this.deleteCard.addEventListener('click', () => {
      if (this.productId)
      this.events.emit('product:delete', {id: this.productId})
    });
  }

  set index(value: number) {
    this.indexProduct.textContent = value.toString();
  }

  set id(value: string) {
    this.productId = value;
  }
}