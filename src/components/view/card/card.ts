import { IProduct } from "../../../types/index";
import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface ICardData extends Partial<IProduct> {
  index?: number;//порядковый номер в корзине
};

export abstract class Card<T extends ICardData> extends Component<T> {
  protected titleCard: HTMLElement;
  protected priceCard: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleCard = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceCard = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.titleCard.textContent = value;
  }

  set price(value: number | null) {
    this.priceCard.textContent = value ? `${value} синапсисов` : "Бесценно";
  }
}