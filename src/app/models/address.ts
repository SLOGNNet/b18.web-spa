import { generateNewId } from './utils';

export class Address {
  id: number = 0;
  name: string = '';
  streetAddress1: string = '';
  streetAddress2: string = '';
  city: string = '';
  phone: string = '';
  state: string = '';
  zip: string = '';
  fax: string = '';
  phoneExtension: string = '';
  faxExtension: string = '';
  latitude: number = 0;
  longitude: number = 0;

  static create(): Address {
    const result = new Address();
    result.id = generateNewId();
    return result;
  }

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
}
