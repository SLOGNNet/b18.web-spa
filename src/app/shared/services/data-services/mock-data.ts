import {
  Load, Customer, Address, CustomerStatuses, CustomerTypes,
  LoadStatuses, DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, StopTypes, Commodity, Contact, LoadType, FreightType, DataAssigneeRequirements } from './models';
class MockData {
  public addresses: Array<Address> = [{
    id: 1,
    name: 'Main Office',
    streetAddress: '14701 Charlson Road, United States',
    secondStreetAddress: '',
    city: 'Eden Prairie',
    phone: '(925) 937-8500',
    state: 'MN',
    zip: '55347',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    id: 2,
    name: 'Main Office',
    streetAddress: '5429 Lyndon B Johnson Freeway',
    secondStreetAddress: 'SUITE 550',
    city: 'Dallas',
    phone: '(972) 669-4259',
    state: 'TX',
    zip: '75240',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    id: 3,
    name: 'Main Office',
    streetAddress: '641 East Watkins Street',
    secondStreetAddress: '',
    city: 'Phoenix',
    phone: '(602) 256-9470',
    state: 'AZ',
    zip: '85004',
    fax: '(602)-256-0631',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    id: 4,
    name: 'Main Office',
    streetAddress: '3101 Packerland Drive, Green Bay, WI, United States',
    secondStreetAddress: '',
    city: 'Green Bay',
    phone: '(800) 558-6767',
    state: 'WI',
    zip: '54313',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  },
  {
    id: 5,
    name: 'Main Office',
    streetAddress: '1000 WYNDHAM PKWY',
    secondStreetAddress: '',
    city: 'BOLINGBROOK',
    phone: '(312) 326-8000',
    state: 'IL',
    zip: '60490',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 40.795675,
      lng: -73.93600099999998
    }
  }
  ];

  public billingAddresses: Array<Address> = [{
    id: 3,
    name: 'Billing Address',
    streetAddress: '14701 Charlson Road, United States',
    secondStreetAddress: 'SUITE 550',
    city: 'Dallas',
    phone: '(972) 669-4259',
    state: 'MN',
    zip: '33708',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 4,
    name: 'Billing Address',
    streetAddress: '5429 Lyndon B Johnson Freeway',
    secondStreetAddress: 'SUITE 550',
    city: 'Dallas',
    phone: '(972) 669-4259',
    state: 'TX',
    zip: '75240',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 5,
    name: 'Billing Address',
    streetAddress: 'BROKER_BILLING_ADDRESS',
    secondStreetAddress: 'SUITE 550',
    city: 'Dallas',
    phone: '(972) 669-4259',
    state: 'TX',
    zip: '75240',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 6,
    name: 'Billing Address',
    streetAddress: 'PO BOX 2545',
    secondStreetAddress: '',
    city: 'Green Bay',
    phone: '(920)-592-6867',
    state: 'WI',
    zip: '54313',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 7,
    name: 'Billing Address',
    streetAddress: '1000 WYNDHAM PKWY',
    secondStreetAddress: '',
    city: 'BOLINGBROOK',
    phone: '(312) 326-8000',
    state: 'IL',
    zip: '60490',
    fax: '',
    phoneExtension: '',
    faxExtension: '',
    location: {
      lat: 0,
      lng: 0
    }
  },
  ];

  public contacts: Array<Contact> = [{
   id: 1,
   firstName: 'Jason',
   lastName: 'Chang',
   personalEmail: 'CHANJAS@chrobinson.com',
   position: 'sales',
   addressId: 1
 },
 {
   id: 2,
   firstName: 'Scott',
   lastName: 'Spearow',
   personalEmail: 'sspearow@TQL.com',
   position: 'sales',
   addressId: 2
 }
 ];

  public customers: Array<Customer> = [
    {
      id: 1,
      name: 'CH ROBINSON COMPANY INC',
      addresses: [this.addresses[0], this.billingAddresses[0]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '',
      mc: '384859'
    },
    {
      id: 2,
      name: 'M W LOGISTICS LLC',
      addresses: [this.addresses[1], this.billingAddresses[1]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '', mc: '392137'
    },
    {
      id: 3,
      name: 'United Freight Service UFS',
      addresses: [this.addresses[2], this.billingAddresses[2]],
      contacts: this.contacts,
      email: 'albert@ufs.net',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '',
      mc: ''
    },
    {
      id: 4,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      addresses: [this.addresses[3], this.billingAddresses[3]],
      contacts: this.contacts,
      email: 'stmcarrier@schneider.com',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '', mc: '133655'
    },
    {
      id: 5,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      addresses: [this.addresses[4], this.billingAddresses[4]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '',
      mc: '283221'
    }
  ];

  public commodities: Array<Commodity> = [{
    id: 1,
    pickupId: 1,
    dropoffId: 1,
    pickupNumber: null,
    dropoffNumber: null,
    po: '8055',
    commodity: 'BaiDrink',
    unitType: 'Pallet(S)',
    unitCount: 0,
    palletCount: 25,
    weight: 0,
  },
  {
    id: 2,
    pickupId: 2,
    dropoffId: 2,
    pickupNumber: 5009,
    dropoffNumber: 45,
    po: '',
    commodity: 'Gypsum',
    unitType: 'Truckload',
    unitCount: 0,
    palletCount: 0,
    weight: 0
  },
  {
    id: 3,
    pickupId: 3,
    dropoffId: 3,
    pickupNumber: null,
    dropoffNumber: 45,
    po: '',
    commodity: '',
    unitType: '',
    unitCount: 0,
    palletCount: 0,
    weight: 0
  },
  {
    id: 4,
    pickupId: 4,
    dropoffId: 4,
    pickupNumber: null,
    dropoffNumber: 45,
    po: '',
    commodity: '',
    unitType: '',
    unitCount: 0,
    palletCount: 42,
    weight: 0
  }
];

  public pickups: Array<Stop> = [{
    id: 1,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[0],
    date: 'date',
    commodities: [this.commodities[0]]
  },
  {
    id: 2,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[1],
    date: 'date',
    commodities: [this.commodities[1]]
  },
  {
    id: 3,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[2],
    date: 'date',
    commodities: [this.commodities[2]]
  },{
    id: 4,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[3],
    date: 'date',
    commodities: [this.commodities[3]]
  }];

  public dropoffs: Array<Stop> = [{
    id: 1,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[0],
    date: 'date',
    commodities: [this.commodities[0]]
  },
  {
    id: 2,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[1],
    date: 'date',
    commodities: [this.commodities[1]]
  },
  {
    id: 3,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[2],
    date: 'date',
    commodities: [this.commodities[2]]
  },{
    id: 4,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[3],
    date: 'date',
    commodities: [this.commodities[3]]
  }];


  public loads: Array<Load> = [
    {
      id: 1,
      customerId: 1,
      customer: null,
      addressId: 1,
      loadNumber: 209282402,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      dataAssignee: DataAssigneeRequirements.MelMel1,
      contactId: 1,
      billingAddressId: 3,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#143',
      pickups: [this.pickups[0]],
      dropoffs: [this.dropoffs[0]]
    },
    {
      id: 2,
      customerId: 2,
      customer: null,
      addressId: 2,
      loadNumber: 7367707,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      dataAssignee: DataAssigneeRequirements.MelMel2,
      billingAddressId: 4,
      contactId: 2,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#141',
      pickups: [this.pickups[1]],
      dropoffs: [this.dropoffs[1]]
    },
    {
      id: 3,
      customerId: 3,
      customer: null,
      addressId: 3,
      loadNumber: 104579538,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      dataAssignee: DataAssigneeRequirements.MelMel1,
      billingAddressId: 5,
      contactId: 3,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#128',
      pickups: [this.pickups[2]],
      dropoffs: [this.dropoffs[2]]
    },
    {
      id: 4,
      customerId: 4,
      customer: null,
      addressId: 4,
      loadNumber: 104605109,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      dataAssignee: DataAssigneeRequirements.MelMel1,
      billingAddressId: 6,
      contactId: 4,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#128',
      pickups: [this.pickups[3]],
      dropoffs: [this.dropoffs[3]]
    },
  ];
}

export default new MockData();
