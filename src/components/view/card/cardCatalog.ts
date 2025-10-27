import { Card } from "./card";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types/index";
import { categoryMap } from "../../../utils/constants";

type CategoryKey = keyof typeof categoryMap;
export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;
interface ICardActions {
  onClick?: (event: MouseEvent) => void;
};

export class CardCatalog extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

    if(actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
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
}