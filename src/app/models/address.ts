export class Address {
  id: number = 0;
  name: string = '';
  streetAddress: string = '';
  secondStreetAddress: string = '';
  city: string = '';
  phone: string = '';
  state: string = '';
  zip: string = '';
  fax: string = '';
  phoneExtension: string = '';
  faxExtension: string = '';
  location: {
    lat: number;
    lng: number;
  };

  static create(): Address{
    const result = new Address();
    return result;
  }

  constructor() {
    this.location = { lat: 0, lng: 0 };
  }
}
