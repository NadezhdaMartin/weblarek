import { IBuyer, TPayment } from "../../types/index";

export class Buyer {
    protected payment: TPayment;
    protected email: string;
    protected phone: string;
    protected address: string;

    constructor(payment: TPayment = '', address: string = '', phone: string = '', email: string = '') {
        this.payment = payment;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    saveBuyerInfo(payment: TPayment, email: string, phone: string, address: string) {
      this.payment = payment;
      this.email = email;
      this.phone = phone;
      this.address = address;
    }

    getBuyerInfo(): IBuyer {
      return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    clearBuyerInfo() {
      this.payment = '';
      this.email = '';
      this.phone = '';
      this.address = '';
    }

    validateData(): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (!this.payment) {
            errors.payment = 'Необходимо выбрать вид оплаты';
        }

        if (!this.email) {
            errors.email = 'Необходимо указать емэйл';
        }

        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон';
        }

        if (!this.address) {
            errors.address = 'Необходимо указать адрес';
        }

        return errors;
    }
}