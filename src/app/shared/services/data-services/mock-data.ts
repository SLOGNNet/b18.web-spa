import {
  Load, Document, Company, Address, CompanyStatuses, CompanyTypes,
  LoadStatuses, DriverRequirements, PowerUnitTypes,
  TrailerTypes, Stop, StopTypes, Commodity, Contact, LoadType,
  FreightType, Facility, Trip, ContactInfoType, ContactInfo,
  StopStatuses, Driver, Equipment, DriverPaymentTypes, DriverStatuses, EquipmentStatuses, EquipmentTypes, StopActionTypes,
  EquipmentModes, EquipmentVehicleOperatings, DriverTypes, EquipmentNotification, License, LicenseClassTypes,
  AppointmentTypes, StopAction, TripStop, Location, MileageRecord
} from './models';
class MockData {

  public addresses: Array<Address> = [{
    id: 1,
    streetAddress1: '14701 Charlson Road, United States',
    streetAddress2: 'SUITE 550',
    city: 'Eden Prairie',
    state: 'MN',
    latitude: 40.795675,
    longitude: -73.93600099999998,
    zip: '11111'
  },
  {
    id: 2,
    streetAddress1: '5429 Lyndon B Johnson Freeway',
    streetAddress2: 'SUITE 550',
    city: 'Dallas',
    state: 'TX',
    latitude: 40.795675,
    longitude: -73.93600099999998,
    zip: '11111'
  },
  {
    id: 3,
    streetAddress1: '641 East Watkins Street',
    streetAddress2: '',
    city: 'Phoenix',
    state: 'AZ',
    latitude: 40.795675,
    longitude: -73.93600099999998,
    zip: '11111'
  },
  {
    id: 4,
    streetAddress1: '3101 Packerland Drive, Green Bay, WI, United States',
    streetAddress2: '',
    city: 'Green Bay',
    state: 'WI',
    latitude: 40.795675,
    longitude: -73.93600099999998,
    zip: '11111'
  },
  {
    id: 5,
    streetAddress1: '1000 WYNDHAM PKWY',
    streetAddress2: '',
    city: 'BOLINGBROOK',
    state: 'IL',
    latitude: 40.795675,
    longitude: -73.93600099999998,
    zip: '11111'
  }
  ];

  public customerBillingAddresses: Array<Address> = [{
    id: 3,
    streetAddress1: '14701 Charlson Road, United States',
    streetAddress2: 'SUITE 550',
    city: 'Dallas',
    state: 'MN',
    latitude: 0,
    longitude: 0,
    zip: '11111'
  },
  {
    id: 4,
    streetAddress1: '5429 Lyndon B Johnson Freeway',
    streetAddress2: 'SUITE 550',
    city: 'Dallas',
    state: 'TX',
    latitude: 0,
    longitude: 0,
    zip: '11111'
  },
  {
    id: 5,
    streetAddress1: 'BROKER_BILLING_ADDRESS',
    streetAddress2: 'SUITE 550',
    city: 'Dallas',
    state: 'TX',
    latitude: 0,
    longitude: 0,
    zip: '11111'
  },
  {
    id: 6,
    streetAddress1: 'PO BOX 2545',
    streetAddress2: '',
    city: 'Green Bay',
    state: 'WI',
    latitude: 0,
    longitude: 0,
    zip: '11111'
  },
  {
    id: 7,
    streetAddress1: '1000 WYNDHAM PKWY',
    streetAddress2: '',
    city: 'BOLINGBROOK',
    state: 'IL',
    latitude: 0,
    longitude: 0,
    zip: '11111'
  },
  ];

  public contactInfo: Array<ContactInfo> = [
    {
      label: 'Primary Phone',
      value: '213123123',
      type: ContactInfoType.Phone
    },
    {
      label: 'Alternative Phone',
      value: '12424234',
      type: ContactInfoType.Phone
    },
    {
      label: 'Fax',
      value: 'fax@gmail.comj',
      type: ContactInfoType.Fax
    }
  ];

  public locations: Array<Location> = [
    {
      id: 1,
      name: 'Main Office',
      address: this.addresses[0],
      contactInfo: this.contactInfo.slice()
    },
    {
      id: 2,
      name: 'Main Office',
      address: this.addresses[1],
      contactInfo: this.contactInfo.slice()
    },
    {
      id: 3,
      name: 'Billing Address',
      address: this.addresses[2],
      contactInfo: this.contactInfo.slice()
    },
    {
      id: 4,
      name: 'Billing Address',
      address: this.addresses[3],
      contactInfo: this.contactInfo.slice()
    }
  ];

  public contacts: Array<Contact> = [{
    id: 1,
    firstName: 'Jason',
    middleName: 'Chang',
    lastName: 'Chang',
    contactInfo: this.contactInfo.slice(),
    position: 'Sales manager',
    locationId: 1,
    location: this.locations[0]
  },
  {
    id: 2,
    firstName: 'Scott',
    middleName: 'Chang',
    lastName: 'Spearow',
    position: 'Sales manager',
    contactInfo: this.contactInfo.slice(),
    locationId: 2,
    location: this.locations[1]
  },
  {
    id: 3,
    firstName: 'Emma',
    middleName: 'Chang',
    lastName: 'Watson',
    position: 'Sales manager',
    contactInfo: this.contactInfo.slice(),
    locationId: 3,
    location: this.locations[2]
  },
  {
    id: 4,
    firstName: 'Johnny',
    middleName: 'Chang',
    lastName: 'Depp',
    position: 'Sales manager',
    contactInfo: this.contactInfo.slice(),
    locationId: 4,
    location: this.locations[3]
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
    address: this.addresses[0],
    contactInfo: this.contactInfo.slice(),
    businessHours: '',
    notes: ''
  }, {
    id: 2,
    name: 'San Francisco, CA',
    address: this.addresses[1],
    contactInfo: this.contactInfo.slice(),
    businessHours: '',
    notes: ''
  }, {
    id: 1,
    name: 'Los Angeles, CA',
    address: this.addresses[2],
    contactInfo: this.contactInfo.slice(),
    businessHours: '',
    notes: ''
  }, {
    id: 2,
    name: 'Los Altos, CA',
    address: this.addresses[3],
    contactInfo: this.contactInfo.slice(),
    businessHours: '',
    notes: ''
  }];

  mileageRecords: Array<MileageRecord> = [{
    type: 'miles',
    value: '2017',
    date: new Date()
  },
  {
    type: 'miles',
    value: '1086',
    date: new Date()
  },
  {
    type: 'miles',
    value: '300',
    date: new Date()
  },
  {
    type: 'miles',
    value: '4515',
    date: new Date()
  }];
  equipmentNotification: Array<EquipmentNotification> = [];

  public equipments: Array<Equipment> = [{
    id: 1,
    make: 'Kenworth',
    model: 'T610',
    number: '101',
    vin: '7653463667',
    notes: 'Oil Change',
    status: EquipmentStatuses.Active,
    type: EquipmentTypes.PowerUnit,
    subType: PowerUnitTypes.Tractor,
    ownership: EquipmentModes.Company,
    vehicleOperating: EquipmentVehicleOperatings.InterState,
    lastTripNumber: 349611,
    lastAddress: '2229 San Pedro Rd, North Sacramento, California',
    equipmentNotification: this.equipmentNotification[0],
    licensePlateState: 'ER24GT45G',
    licensePlateNumber: '123123',
    licensePlateExpiration: new Date(),
    isSleeperBerthAvailable: true,
    mileageRecord: [this.mileageRecords[0], this.mileageRecords[1], this.mileageRecords[2]],
    driver: {
      id: 1,
      firstName: 'Jason',
      middleName: 'Chang',
      lastName: 'Chang',
      address: this.addresses[0],
      contactInfo: this.contactInfo.slice(),
      dateOfBirth: null,
      ssn: '123144241241242',
      currentTruck: null,
      currentTrailer: null,
      associatedEquipments: [],
      paymentType: DriverPaymentTypes.PerMile,
      rate: 1.2,
      type: DriverTypes.CompanyDriver,
      hireDate: null,
      terminationDate: null,
      status: DriverStatuses.Active,
      memberFullName: 'Jason Chang',
      notes: 'notes',
      lastTripNumber: 349611,
      lastAddress: '2229 San Pedro Rd, North Sacramento',
      license: null
    }
  }, {
    id: 2,
    make: 'Wabash',
    model: 'CA9000(Referer 53)',
    number: '2349',
    vin: '346474364537',
    notes: 'test notes',
    status: EquipmentStatuses.Active,
    type: EquipmentTypes.Trailer,
    subType: TrailerTypes.DryVan48,
    ownership: EquipmentModes.Company,
    vehicleOperating: EquipmentVehicleOperatings.InterState,
    lastTripNumber: 349616,
    lastAddress: '2229 San Pedro Rd, North Sacramento, California',
    equipmentNotification: this.equipmentNotification[0],
    licensePlateState: 'QYT4567FH5',
    licensePlateNumber: '123123',
    licensePlateExpiration: new Date(),
    isSleeperBerthAvailable: true,
    mileageRecord:[this.mileageRecords[0], this.mileageRecords[1], this.mileageRecords[2]],
    driver: {
      id: 2,
      firstName: 'Emma',
      middleName: 'Chang',
      lastName: 'Watson',
      address: this.addresses[0],
      contactInfo: this.contactInfo.slice(),
      dateOfBirth: null,
      ssn: '123144241241242',
      currentTruck: null,
      currentTrailer: null,
      associatedEquipments: [],
      paymentType: DriverPaymentTypes.PerMile,
      rate: 1.2,
      type: DriverTypes.CompanyDriver,
      hireDate: null,
      terminationDate: null,
      status: DriverStatuses.Active,
      notes: 'notes',
      lastTripNumber: 349611,
      memberFullName: 'Emma Watson',
      lastAddress: '2229 San Pedro Rd, North Sacramento',
      license: null
    }
  }];

  public licenses: Array<License> = [{
    id: 0,
    number: '21424',
    expiration: new Date(),
    dateIssued: new Date(),
    stateIssued: 'AL',
    class: LicenseClassTypes.ClassB,
    endorsments: 'M N',
    restrictions: 'D E',
  }, {
    id: 1,
    number: '21424',
    expiration: new Date(),
    dateIssued: new Date(),
    stateIssued: 'AL',
    class: LicenseClassTypes.ClassA,
    endorsments: 'X L',
    restrictions: 'C Z',
  }];

  public drivers: Array<Driver> = [{
    id: 1,
    firstName: 'Jason',
    middleName: 'Chang',
    lastName: 'Chang',
    address: this.addresses[0],
    contactInfo: this.contactInfo.slice(),
    dateOfBirth: new Date(),
    ssn: '123144241241242',
    currentTruck: this.equipments[0],
    currentTrailer: this.equipments[1],
    associatedEquipments: [this.equipments[0], this.equipments[1]],
    paymentType: DriverPaymentTypes.PerMile,
    rate: 1.2,
    type: DriverTypes.CompanyDriver,
    hireDate: null,
    terminationDate: null,
    status: DriverStatuses.Active,
    notes: 'notes',
    lastTripNumber: 349611,
    memberFullName: 'Jason Chang',
    lastAddress: '2229 San Pedro Rd, North Sacramento',
    license: this.licenses[1]
  }, {
    id: 2,
    firstName: 'Emma',
    middleName: 'Chang',
    lastName: 'Watson',
    contactInfo: this.contactInfo.slice(),
    address: this.addresses[1],
    dateOfBirth: null,
    ssn: '123144241241777',
    currentTruck: this.equipments[0],
    currentTrailer: this.equipments[1],
    associatedEquipments: [this.equipments[0], this.equipments[1]],
    paymentType: DriverPaymentTypes.PerMile,
    rate: 1.2,
    type: DriverTypes.OwnerOperator,
    hireDate: null,
    terminationDate: null,
    status: DriverStatuses.Active,
    notes: 'notes',
    lastTripNumber: 349777,
    memberFullName: 'Emma Watson',
    lastAddress: '2229 San Pedro Rd, North Sacramento, California',
    license: this.licenses[0]
  }];

  public trips: Array<Trip> = [{
    id: 1,
    number: '345351',
    truck: this.equipments[0],
    trailer: this.equipments[0],
    driverTeams: [{ id: 1, drivers: [this.drivers[0], this.drivers[0], this.drivers[1]] }]
  }, {
    id: 2,
    number: '345351',
    truck: this.equipments[1],
    trailer: this.equipments[0],
    driverTeams: [{ id: 2, drivers: [this.drivers[1]] }]
  }, {
    id: 3,
    number: '345351',
    truck: this.equipments[1],
    trailer: this.equipments[0],
    driverTeams: [{ id: 3, drivers: [this.drivers[0]] }]
  }, {
    id: 4,
    number: '345351',
    truck: this.equipments[0],
    trailer: this.equipments[0],
    driverTeams: [{ id: 4, drivers: [this.drivers[1]] }]
  }];

  public stopActionCollection: Array<StopAction> = [{
        type: StopActionTypes.Pickup,
        commodity: this.commodities[0]
       },
       {
        type: StopActionTypes.Dropoff,
        commodity: this.commodities[1]
       },
       {
        type: StopActionTypes.Dropoff,
        commodity: this.commodities[2]
       }
  ];

  public tripStopCollection: Array<TripStop> = [{
      id: 1,
      appointment: {
        from: new Date(2017, 2, 1, 8),
        to: new Date(2017, 2, 1, 10),
        type: AppointmentTypes.FCFS
      },
      notes: 'test',
      facility: this.facilities[0],
      stopActions: [this.stopActionCollection[0], this.stopActionCollection[1]],
       trip: this.trips[0]
    },
    {
      id: 13,
      appointment: {
        from: new Date(2017, 2, 2, 8),
        to: new Date(2017, 2, 2, 10),
        type: AppointmentTypes.FCFS
      },
      notes: 'test',
      trip: this.trips[0],
      facility: this.facilities[0],
      stopActions: [this.stopActionCollection[0], this.stopActionCollection[1]]
    }
    ];

  public startDate = new Date(2017, 0, 9);
  public endDate = new Date(2017, 0, 22);

  public pickups: Array<Stop> = [{
    id: 1,
    notes: 'notes',
    type: StopTypes.Pickup,
    departedAt: this.startDate,
    arrivedAt: this.endDate,
    plannedArrivalAt: this.endDate,
    plannedDepartureAt: this.startDate,
    facility: this.facilities[0],
    status: StopStatuses.InProgress,
    tripStops: [this.tripStopCollection[0], this.tripStopCollection[1]]
  }
  // {
  //   id: 2,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[1],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 3,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 4,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 5,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 6,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // }, {
  //   id: 7,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[0],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 8,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[1],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 9,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 10,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 11,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 12,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 13,
  //   notes: 'notes',
  //   type: StopTypes.Pickup,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // }
 ];

  public dropoffs: Array<Stop> = [{
    id: 13,
    notes: 'notes',
    type: StopTypes.Dropoff,
    departedAt: this.startDate,
    arrivedAt: this.endDate,
    plannedArrivalAt: this.endDate,
    plannedDepartureAt: this.startDate,
    facility: this.facilities[0],
    status: StopStatuses.InProgress,
    tripStops: [this.tripStopCollection[0]]
  }
  // {
  //   id: 14,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[1],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 15,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 16,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 17,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 18,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // }, {
  //   id: 19,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[0],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 20,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[1],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 21,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 22,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[3],
  //   status: StopStatuses.InProgress
  // },
  // {
  //   id: 23,
  //   notes: 'notes',
  //   type: StopTypes.Dropoff,
  //   departedAt: this.startDate,
  //   arrivedAt: this.endDate,
  //   plannedArrivalAt: this.endDate,
  //   plannedDepartureAt: this.startDate,
  //   facility: this.facilities[2],
  //   status: StopStatuses.InProgress
  // }
  ];

  public loads: Array<Load> = [
    {
      id: 1,
      companyId: 1,
      customer: null,
      customerLocation: this.locations[0],
      customerBillingLocation: this.locations[2],
      customerLoadNo: '726457361',
      systemLoadNo: '209282402',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      contactId: 1,
      customerBillingLocationId: 3,
      status: LoadStatuses.Completed,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#143',
      trips: this.trips,
      currentTrips: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[0], this.commodities[1]]
    },
    {
      id: 2,
      companyId: 2,
      customer: null,
      customerLocation: this.locations[1],
      customerBillingLocation: this.locations[3],
      customerLoadNo: '234457361',
      systemLoadNo: '7367707',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 4,
      contactId: 2,
      status: LoadStatuses.InTransit,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#141',
      trips: this.trips,
      currentTrips: [this.trips[1], this.trips[2]],
      stops: [this.pickups[0], this.pickups[0], this.dropoffs[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[2]]
    },
    {
      id: 3,
      companyId: 3,
      customer: null,
      customerLocation: this.locations[0],
      customerBillingLocation: this.locations[2],
      customerLoadNo: '111557361',
      systemLoadNo: '104579538',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 5,
      contactId: 3,
      status: LoadStatuses.InTransit,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[2], this.trips[3]],
      stops: [this.pickups[0], this.dropoffs[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[2]]
    },
    {
      id: 4,
      companyId: 4,
      customer: null,
      customerLocation: this.locations[1],
      customerBillingLocation: this.locations[3],
      customerLoadNo: '827461356',
      systemLoadNo: '104605109',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 6,
      contactId: 4,
      status: LoadStatuses.Pending,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[3], this.trips[0]],
      stops: [this.pickups[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[3]]
    },
    {
      id: 5,
      companyId: 4,
      customer: null,
      customerLocation: this.locations[0],
      customerBillingLocation: this.locations[2],
      customerLoadNo: '827461356',
      systemLoadNo: '104605109',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 6,
      contactId: 4,
      status: LoadStatuses.InTransit,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.pickups[0], this.dropoffs[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[2]]
    },
    {
      id: 6,
      companyId: 2,
      customer: null,
      customerLocation: this.locations[1],
      customerBillingLocation: this.locations[3],
      customerLoadNo: '827461356',
      systemLoadNo: '104605109',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 6,
      contactId: 2,
      status: LoadStatuses.Completed,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.pickups[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[3]]
    },
    {
      id: 7,
      companyId: 3,
      customer: null,
      customerLocation: this.locations[0],
      customerBillingLocation: this.locations[2],
      customerLoadNo: '827461356',
      systemLoadNo: '104605109',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 6,
      contactId: 3,
      status: LoadStatuses.Pending,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[0]]
    },
    {
      id: 8,
      companyId: 4,
      customer: null,
      customerLocation: this.locations[1],
      customerBillingLocation: this.locations[3],
      customerLoadNo: '827461356',
      systemLoadNo: '104605109',
      type: LoadType.FTL,
      freightType: FreightType.Dry,
      customerBillingLocationId: 6,
      contactId: 4,
      status: LoadStatuses.Completed,
      driverRequirment: DriverRequirements.Solo,
      requiredPowerUnitType: PowerUnitTypes.Tractor,
      requiredTrailerType: TrailerTypes.DryVan53,
      specialRequirments: '#128',
      trips: this.trips,
      currentTrips: [this.trips[0], this.trips[1]],
      stops: [this.pickups[0], this.pickups[0], this.dropoffs[0]],
      documents: [this.documents[0]],
      commodities: [this.commodities[1]]
    },
  ];

  public companies: Array<Company> = [
    {
      id: 1,
      name: 'CH ROBINSON COMPANY INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '384859',
      loads: []
    },
    {
      id: 2,
      name: 'M W LOGISTICS LLC',
      locations: [this.locations[1], this.locations[1]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: []
    },
    {
      id: 3,
      name: 'United Freight Service UFS',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[2]],
      email: 'albert@ufs.net',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '',
      loads: []
    },
    {
      id: 4,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[3]],
      email: 'stmcarrier@schneider.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '', mc: '133655',
      loads: []
    },
    {
      id: 5,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '283221',
      loads: []
    },
    {
      id: 6,
      name: 'CH ROBINSON COMPANY INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '384859',
      loads: []
    },
    {
      id: 7,
      name: 'M W LOGISTICS LLC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: []
    },
    {
      id: 8,
      name: 'United Freight Service UFS',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[2]],
      email: 'albert@ufs.net',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '',
      loads: []
    },
    {
      id: 9,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[3]],
      email: 'stmcarrier@schneider.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '', mc: '133655',
      loads: []
    },
    {
      id: 10,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '283221',
      loads: []
    },
    {
      id: 11,
      name: 'CH ROBINSON COMPANY INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '384859',
      loads: []
    },
    {
      id: 12,
      name: 'M W LOGISTICS LLC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: []
    },
    {
      id: 13,
      name: 'United Freight Service UFS',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[2]],
      email: 'albert@ufs.net',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '',
      loads: []
    },
    {
      id: 14,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[3]],
      email: 'stmcarrier@schneider.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '', mc: '133655',
      loads: []
    },
    {
      id: 15,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '283221',
      loads: []
    },
    {
      id: 16,
      name: 'CH ROBINSON COMPANY INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '384859',
      loads: []
    },
    {
      id: 17,
      name: 'M W LOGISTICS LLC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: []
    },
    {
      id: 18,
      name: 'United Freight Service UFS',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[2]],
      email: 'albert@ufs.net',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '',
      loads: []
    },
    {
      id: 19,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[3]],
      email: 'stmcarrier@schneider.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '', mc: '133655',
      loads: []
    },
    {
      id: 20,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '283221',
      loads: []
    },
    {
      id: 21,
      name: 'CH ROBINSON COMPANY INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[0]],
      email: 'carrier.services@chrobinson.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '384859',
      loads: []
    },
    {
      id: 22,
      name: 'M W LOGISTICS LLC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[1]],
      email: 'HAVETO ADD@mwlogistics.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '392137',
      loads: []
    },
    {
      id: 23,
      name: 'United Freight Service UFS',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[2]],
      email: 'albert@ufs.net',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '',
      loads: []
    },
    {
      id: 24,
      name: 'SCHNEIDER NATIONAL CARRIERS INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: [this.contacts[3]],
      email: 'stmcarrier@schneider.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '', mc: '133655',
      loads: []
    },
    {
      id: 25,
      name: 'RR DONNELLEY LOGISTICS SERVICES WORLDWIDE INC',
      locations: [this.locations[0], this.locations[2]],
      contacts: this.contacts,
      email: 'havetoadd@rrdonelley.com',
      status: CompanyStatuses.Active,
      type: CompanyTypes.Broker,
      taxId: '',
      mc: '283221',
      loads: []
    }
  ];


  public states: Array<string> = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
    'WY'
  ];

  public endorsements: Array<string> = [
    'P', 'H', 'M', 'N', 'T', 'X', 'L', 'S'
  ];

  public restrictions: Array<string> = [
    'B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M', 'N',
    'O', 'T', 'Z'
  ];
}

export default new MockData();
