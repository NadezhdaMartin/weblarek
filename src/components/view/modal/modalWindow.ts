import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { EventEmitter } from "../../base/Events";

interface IModalWindow {
  content: HTMLElement;
}

export class ModalWindow extends Component<IModalWindow> {
  protected closeButton: HTMLButtonElement;
  protected contentContainerElement: HTMLElement

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.contentContainerElement = ensureElement<HTMLElement>('.modal__content', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this.closeButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    })

    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.events.emit('modal:close');
      }
    });//закрытие при нажатии на оверлей
  }

  set content(value: HTMLElement) {
    this.contentContainerElement.replaceChildren(value);
    this.container.classList.add('modal_active');
  }

  closeModal() {
    this.container.classList.remove('modal_active');
  }
}