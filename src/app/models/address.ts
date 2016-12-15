export class Address {
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

  constructor() {
    this.location = { lat: 0, lng: 0 };
  }
}
