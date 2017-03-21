import { generateNewId } from './utils';

export class Address {
  id: string = '';
  streetAddress1: string = '';
  streetAddress2: string = '';
  city: string = '';
  zip: string = '';
  state: string = '';
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
