// company enums
export enum CompanyTypes {
  Broker = 1,
  FreightForwarder = 2,
  Shipper = 3,
  Carrier = 4
};

export enum CompanyStatuses {
  Inactive = 1,
  Active = 2,
  Unavaliable = 3
}

// driver enums
export enum DriverTypes {
  CompanyDriver = 1,
  OwnerOperator = 2
};

export enum DriverStatuses {
  Inactive = 1,
  Active = 2,
  Unavaliable = 3
}

export enum DriverPaymentOptions {
  PerMile = 1,
  Percentage = 2,
  Hourly = 3,
  Flat = 4
}

// equipment enums
export enum EquipmentTypes {
  Trailer = 1,
  PowerUnit = 2
};

export enum EquipmentModes {
  Company = 1
};

export enum EquipmentStatuses {
  Inactive = 1,
  Active = 2,
  NotAvaliable = 3
}

export enum EquipmentVehicleOperatings {
  InterState = 1,
  IntraState = 2
}

// load enums
export enum LoadStatuses {
  Booked = 1,
  Assigned = 2,
  Pending = 3,
  Scheduled = 4,
  EnRoute = 5,
  InTransit = 6,
  Delivered = 7,
  Completed = 8,
  Canceled = 9,
}

export enum DriverRequirements {
  Solo = 1
};

export enum LoadType {
  FTL = 1,
  LTL = 2
};

export enum FreightType {
  Dry = 1,
  Reefer = 2
}

export enum PowerUnitTypes {
  Tractor = 1,
  StraightTruck25 = 2,
  StraightTruckFlatbed = 3,
  Bus = 4,
  Other = 5
};

export enum TrailerTypes {
  DryVan53 = 1,
  Reefer = 2,
  DryVan48 = 3,
  Reefer48 = 4,
  FlatBed53 = 5,
  Other = 6,
};

// notification enums
export enum NotificationStatus {
  New = 1,
  Add = 2,
  Error = 3
};

export enum NotificationType {
  Notification = 1,
  Message = 2,
  Task = 3
};

export enum NotificationPriority {
  High = 1,
  Middle = 2,
  Low = 3,
};

export enum TaskType {
  New = 1,
  InProgress = 2,
  Done = 3,
  Error = 4
}

// stop enums
export enum StopTypes {
  None = 0,
  Pickup = 1,
  Dropoff = 2
};

export enum StopStatuses {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
  Problem = 4
};
