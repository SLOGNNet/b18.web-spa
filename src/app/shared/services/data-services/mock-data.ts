import { Load, Customer, Address, CustomerStatuses, CustomerTypes,
  LoadStatuses, DriverRequirments, PowerUnitTypes, TrailerTypes, Stop, Commodity, Contact } from './models';
class MockData {
  public addresses: Array<Address> = [{
    id: 1,
    name: 'Street Address 1',
    streetAddress: 'Street address 1',
    secondStreetAddress: 'Street address 2',
    city: 'City',
    phone: '',
    state: 'FL state',
    zip: '33708 zip',
    fax: '',
    phoneExtension: '311',
    faxExtension: '322',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    id: 2,
    name: 'Street Address 2',
    streetAddress: 'test',
    secondStreetAddress: 'test',
    city: 'City 3',
    phone: '345345',
    state: 'Fy state',
    zip: '33708 zip',
    fax: '44',
    phoneExtension: '441',
    faxExtension: '36',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  }
  ];

  public billingAddresses: Array<Address> = [{
    id: 3,
    name: 'Billing Address 1',
    streetAddress: 'billing street address 1',
    secondStreetAddress: 'Street address 2',
    city: 'City',
    phone: '2221',
    state: 'FL state',
    zip: '33708 zip',
    fax: '',
    phoneExtension: '355',
    faxExtension: '377',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 4,
    name: 'Billing Address 2',
    streetAddress: 'billing street address 2',
    secondStreetAddress: 'test',
    city: 'City 3',
    phone: '345345',
    state: 'Fy state',
    zip: '33708 zip',
    fax: '44',
    phoneExtension: '455',
    faxExtension: '477',
    location: {
      lat: 0,
      lng: 0
    }
  }
  ];

  public contacts: Array<Contact> = [{
   id: 1,
   firstName: 'Contact 1',
   lastName: 'Last name 1',
   personalEmail: 'qwerty@gmail.com',
   position: 'CEO',
   addressId: 1
 },
 {
   id: 2,
   firstName: 'Contact 2',
   lastName: 'Last name 2',
   personalEmail: 'qwerty@gmail.com',
   position: 'Sales manager',
   addressId: 2
 }
 ];

  public customers: Array<Customer> = [
    {
      id: 1, name: 'ARP Logistic INC', addresses: this.addresses, contacts: this.contacts, email: 'qwerty1@gmail.com',
      status: CustomerStatuses.Active, type: CustomerTypes.Broker, taxId: '1', mc: '423466'
    },
    {
      id: 2, name: 'DNS Logistic Corp', addresses: this.billingAddresses, contacts: this.contacts, email: 'qwerty2@gmail.com',
      status: CustomerStatuses.Unavaliable, type: CustomerTypes.Shipper, taxId: '1', mc: '889065'
    },
    {
      id: 3, name: 'Purum Company', addresses: this.addresses, contacts: this.contacts, email: 'qwerty3@gmail.com',
      status: CustomerStatuses.Inactive, type: CustomerTypes.Broker, taxId: '1', mc: '254785'
    },
    {
      id: 4, name: 'Approximately', addresses: this.billingAddresses, contacts: this.contacts, email: 'qwerty4@gmail.com',
      status: CustomerStatuses.Inactive, type: CustomerTypes.Shipper, taxId: '1', mc: '456887'
    },
    {
      id: 5, name: 'Satisfying company', addresses: this.addresses, contacts: this.contacts, email: 'qwerty5@gmail.com',
      status: CustomerStatuses.Active, type: CustomerTypes.Broker, taxId: '1', mc: '123452'
    }
  ];

  public commodities: Array<Commodity> = [{
    pickupNumber: 1,
    po: '23324234',
    commodity: 'Strawberry',
    unitType: 'Boxes',
    unitCount: 22,
    palletCount: 10,
    weight: 14,
  },
    {
      pickupNumber: 2,
      po: '789',
      commodity: 'Toma',
      unitType: 'Boxes',
      unitCount: 10,
      palletCount: 10,
      weight: 5
    }];

  public stops: Array<Stop> = [{
    notes: 'notes',
    address: this.addresses[0],
    date: 'date',
    commodities: this.commodities
  }];


  public loads: Array<Load> = [
    {
      id: 1,
      customerId: 1,
      customer: null,
      addressId: 1,
      contactId: 1,
      billingAddressId: 3,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.Reefer,
      specialRequirment: 'specialRequirments1',
      stops: this.stops
    },
    {
      id: 2,
      customerId: 2,
      customer: null,
      addressId: 2,
      billingAddressId: 4,
      contactId: 2,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.Other,
      specialRequirment: 'specialRequirments2',
      stops: this.stops
    },
    {
      id: 3,
      customerId: 3,
      customer: null,
      addressId: 1,
      billingAddressId: 3,
      contactId: 1,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Other,
      trailerType: TrailerTypes.Reefer,
      specialRequirment: 'specialRequirments3',
      stops: this.stops
    },
  ];
}

export default new MockData();
