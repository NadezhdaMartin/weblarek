import { IBuyer, TPayment, TErrors } from "../../types/index";

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

  saveBuyerInfo(updates: { payment?: TPayment; email?: string; phone?: string; address?: string }) {
    if (updates.payment !== undefined) {
      this.payment = updates.payment;
    }
    if (updates.email !== undefined) {
      this.email = updates.email;
    }
    if (updates.phone !== undefined) {
      this.phone = updates.phone;
    }
    if (updates.address !== undefined) {
      this.address = updates.address;
    }
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

  validateData(): TErrors {
    const errors: TErrors = {};
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