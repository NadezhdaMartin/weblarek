import { Card } from "./card";
import { IProduct } from "../../../types/index";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { categoryMap } from "../../../utils/constants";

export type TCardModal = Pick<IProduct,'id' | 'image' | 'category' | 'description'> & {
  buttonText: string;
};
type CategoryKey = keyof typeof categoryMap;

export class CardInModal extends Card<TCardModal> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected addCardButton: HTMLButtonElement;
  protected productId: string = '';

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
  
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.addCardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.addCardButton.addEventListener('click', () => {
      this.events.emit('cart:toggle', { productId: this.productId });
    });
  }

  set id(value: string) {
    this.productId = value;
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }
  
  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.addCardButton.textContent = value;
  }

  set price(value: number | null) {
    this.addCardButton.disabled = value == null;
    super.price = value;
  }
}