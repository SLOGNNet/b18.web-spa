import { Address } from './index';

export class Contact {
  id: number = 0;
  firstName: string;
  lastName: string;
  personalEmail: string;
  position: string;
  addressId: number;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {

  }
};
