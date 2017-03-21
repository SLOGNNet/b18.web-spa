// company enums
export enum CompanyTypes {
  BROKER = 1,
  FREIGHT_FORWARDER = 2,
  SHIPPER = 3,
  CARRIER = 4
};

export enum CompanyStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  UNAVALIABLE = 3
}

// driver enums
export enum DriverTypes {
  COMPANY_DRIVER = 1,
  OWNER_OPERATOR = 2
};

export enum DriverStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  UNAVALIABLE = 3
}

export enum DriverPaymentOptions {
  PER_MILE = 1,
  PERCENTAGE = 2,
  HOURLY = 3,
  FLAT = 4
}

// equipment enums
export enum EquipmentTypes {
  NONE = 0,
  TRAILER = 1,
  POWER_UNIT = 2
};

export enum EquipmentModes {
  NONE = 0,
  COMPANY = 1,
  OWNER_OPERATOR = 2
};

export enum EquipmentStatuses {
  NONE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  NOT_AVALIABLE = 3
}

export enum EquipmentVehicleOperatings {
  INTER_STATE = 1,
  INTRA_STATE = 2
}

// load enums
export enum LoadStatuses {
  BOOKED = 1,
  ASSIGNED = 2,
  PENDING = 3,
  SCHEDULED = 4,
  EN_ROUTE = 5,
  IN_TRANSIT = 6,
  DELIVERED = 7,
  COMPLETED = 8,
  CANCELED = 9,
}

export enum DriverRequirements {
  SOLO = 1
};

export enum LoadType {
  FTL = 1,
  LTL = 2
};

export enum FreightType {
  DRY = 1,
  REEFER = 2
}

export enum PowerUnitTypes {
  TRACTOR = 1,
  STRAIGHT_TRUCK_25 = 2,
  STRAIGHT_TRUCK_FLATBED = 3,
  BUS = 4,
  OTHER = 5
};

export enum TrailerTypes {
  DRY_VAN_53 = 1,
  REEFER = 2,
  DRY_VAN_48 = 3,
  REEFER_48 = 4,
  FLAT_BED_53 = 5,
  OTHER = 6,
};

// notification enums
export enum NotificationStatus {
  NEW = 1,
  ADD = 2,
  ERROR = 3
};

export enum NotificationType {
  NOTIFICATION = 1,
  MESSAGE = 2,
  TASK = 3
};

export enum NotificationPriority {
  HIGH = 1,
  MIDDLE = 2,
  LOW = 3,
};

export enum TaskType {
  NEW = 1,
  IN_PROGRESS = 2,
  DONE = 3,
  ERROR = 4
}

// stop enums
export enum StopTypes {
  NONE = 0,
  PICKUP = 1,
  DROPOFF = 2
};

export enum StopStatuses {
  NONE = 0,
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  PROBLEM = 4
};

export enum ContactInfoType {
  NONE = 0,
  PHONE = 1,
  FAX = 2,
  EMAIL = 3
};

export enum LicenseClassTypes {
  NONE = 0,
  CLASS_A = 1,
  CLASS_B = 2,
  CLASS_C = 3
};

export enum AppointmentTypes {
  NONE = 0,
  FCFS = 1,
  APPT = 2
}

export enum StopActionTypes {
    NONE = 0,
    PICKUP = 1,
    DROPOFF = 2
}
