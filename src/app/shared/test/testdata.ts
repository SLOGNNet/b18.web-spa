import {
  Load, Document, Customer, Address, CustomerStatuses, CustomerTypes,
  LoadStatuses, DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, StopTypes, Commodity, Contact, LoadType,
  FreightType, Facility, Trip,
  StopStatuses, Driver, Equipment, DriverPaymentOptions,
  DriverTypes, DriverStatuses, EquipmentStatuses, EquipmentTypes,
  EquipmentModes, EquipmentVehicleOperatings, EquipmentDriverType } from '../../models';

export class TestData {
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
    lat: 40.795675,
    lng: -73.93600099999998
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
    lat: 40.795675,
    lng: -73.93600099999998
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
    lat: 0,
    lng: 0
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
    lat: 0,
    lng: 0
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
    lat: 0,
    lng: 0
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

  public documents: Array<Document> = [
    {
      id: 1,
      type: 'Rate Sheet',
      issueDate: '20/10/2017',
      url: '',
      file: null
    }
  ];

  public commodities: Array<Commodity> = [{
    id: 1,
    pickupId: 1,
    dropoffId: 13,
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
    dropoffId: 13,
    pickupNumber: 5009,
    dropoffNumber: null,
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
    dropoffId: 13,
    pickupNumber: null,
    dropoffNumber: null,
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
    dropoffId: 8,
    pickupNumber: null,
    dropoffNumber: null,
    po: '',
    commodity: '',
    unitType: '',
    unitCount: 0,
    palletCount: 42,
    weight: 0
  }
];

  public facilities: Array<Facility> = [{
    id: 1,
    name: 'Larede, TX',
    address: this.addresses[0]
  }, {
    id: 2,
    name: 'San Francisco, CA',
    address: this.addresses[1]
  }];

  public equipments: Array<Equipment> = [{
    id: 0,
    make: 'Kenworth',
    model: 'T610',
    number: '101',
    vin: '',
    notes: 'Oil Change',
    status: EquipmentStatuses.Active,
    type: EquipmentTypes.PowerUnit,
    driverFirstName: 'Goving',
    driverLastName: 'Bhatti',
    subType: PowerUnitTypes.Tractor,
    mode: EquipmentModes.Company,
    vehicleOperating: EquipmentVehicleOperatings.InterState,
    driverType: EquipmentDriverType.CompanyDriver,
    lastTripNumber: 349611,
    lastAddress: '2229 San Pedro Rd, North Sacramento, California'
  }, {
    id: 1,
    make: 'Wabash',
    model: 'CA9000(Referer 53)',
    number: '2349',
    vin: '',
    notes: '',
    status: EquipmentStatuses.Active,
    type: EquipmentTypes.Trailer,
    driverFirstName: 'Goving',
    driverLastName: 'Bhatti',
    subType: TrailerTypes.DryVan48,
    mode: EquipmentModes.Company,
    vehicleOperating: EquipmentVehicleOperatings.InterState,
    driverType: EquipmentDriverType.OwnerOperator,
    lastTripNumber: 349616,
    lastAddress: '2229 San Pedro Rd, North Sacramento, California'
  }];

  public drivers: Array<Driver> = [{
    id: 0,
    firstName: 'Goving',
    lastName: 'Bhatti',
    dateOfBirth: null,
    ssn: '123144241241242',
    powerUnitAssigned: this.equipments[0],
    trailerAssigned: this.equipments[1],
    paymentOption: DriverPaymentOptions.PerMile,
    rate: 1.2,
    contact: this.contacts[0],
    type: DriverTypes.CompanyDriver,
    hireDate: null,
    terminationDate: null,
    status: DriverStatuses.Active,
    notes: 'notes',
    phone: '+1-650-4603122',
    lastTripNumber: 349611,
    lastAddress: '2229 San Pedro Rd, North Sacramento'
  }, {
    id: 1,
    firstName: 'Emma',
    lastName: 'Watson',
    dateOfBirth: null,
    ssn: '123144241241777',
    powerUnitAssigned: this.equipments[0],
    trailerAssigned: this.equipments[1],
    paymentOption: DriverPaymentOptions.PerMile,
    rate: 1.2,
    contact: this.contacts[1],
    type: DriverTypes.OwnerOperator,
    hireDate: null,
    terminationDate: null,
    status: DriverStatuses.Active,
    notes: 'notes',
    phone: '+1-650-4603122',
    lastTripNumber: 349777,
    lastAddress: '2229 San Pedro Rd, North Sacramento, California'
  }];

  public trips: Array<Trip> = [{
    id: 1,
    number: 345351,
    truckNumber: 1021,
    trailerNumber: 2349,
    driver: this.drivers[0]
  }, {
    id: 2,
    number: 345351,
    truckNumber: 1021,
    trailerNumber: 2349,
    driver: this.drivers[0]
  }, {
    id: 3,
    number: 345351,
    truckNumber: 1021,
    trailerNumber: 2349,
    driver: this.drivers[0]
  }, {
    id: 4,
    number: 345351,
    truckNumber: 1021,
    trailerNumber: 2349,
    driver: this.drivers[0]
  }];

  public startDate = new Date(2017, 0, 9);

  public pickups: Array<Stop> = [{
    id: 1,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[0],
    date: this.startDate,
    facility: this.facilities[0],
    status: StopStatuses.InProgress
  },
  {
    id: 2,
    notes: 'notes',
    type: StopTypes.Pickup,
    address: this.addresses[1],
    date: this.startDate,
    facility: this.facilities[1],
    status: StopStatuses.InProgress
  }];

  public endDate = new Date(2017, 0, 22);

  public dropoffs: Array<Stop> = [{
    id: 13,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[1],
    date: this.endDate,
    facility: this.facilities[0],
    status: StopStatuses.InProgress
  },
  {
    id: 14,
    notes: 'notes',
    type: StopTypes.Dropoff,
    address: this.addresses[0],
    date: this.endDate,
    facility: this.facilities[1],
    status: StopStatuses.InProgress
  }];


  public loads: Array<Load> = [
    {
      id: 1,
      customerId: 1,
      customer: null,
      addressId: 1,
      customerLoadNumber: 726457361,
      systemLoadNumber: 209282402,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      contactId: 1,
      billingAddressId: 3,
      status: LoadStatuses.Completed,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#143',
      trips: this.trips,
      currentTrip: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.pickups[1], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[0], this.commodities[1]]
    },
    {
      id: 2,
      customerId: 2,
      customer: null,
      addressId: 2,
      customerLoadNumber: 234457361,
      systemLoadNumber: 7367707,
      loadType: LoadType.FTL,
      freightType: FreightType.Dry,
      billingAddressId: 4,
      contactId: 2,
      status: LoadStatuses.InTransit,
      driverRequirment: DriverRequirements.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.DryVan53,
      specialRequirment: '#141',
      trips: this.trips,
      currentTrip: [this.trips[1], this.trips[2]],
      stops: [this.pickups[0], this.pickups[1], this.dropoffs[0], this.dropoffs[1]],
      documents: [this.documents[0]],
      commodities: [this.commodities[2]]
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
      mc: '384859',
      loads: [this.loads[0], this.loads[1]]
    },
    {
      id: 2,
      name: 'M W LOGISTICS LLC',
      addresses: [this.addresses[1], this.billingAddresses[1]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CustomerStatuses.Active,
      type: CustomerTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: [this.loads[2], this.loads[3]]
    }
  ];
}
