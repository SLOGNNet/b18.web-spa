import { Equipment } from './equipment';
import { Contact } from './contact';
import { DriverTypes, DriverStatuses, DriverPaymentOptions } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

// Colors
function createStatusColors() {
 let result = {};
  result[DriverStatuses.Unavaliable] = '#ffbe4d';
  result[DriverStatuses.Active] = '#85d183';
  result[DriverStatuses.Inactive] = '#fb3a3a';

  return result;
};

const statusColors = createStatusColors();

@JsonObject
export class Driver {
  private static statusText = ['inactive', 'active', 'unavaliable'];
  private static typeText = ['Company driver', 'Owner operator'];

  @JsonMember
  id: number = 0;
  @JsonMember
  firstName: string = '';
  @JsonMember
  lastName: string = '';
  @JsonMember
  dateOfBirth: Date = null;
  @JsonMember
  ssn: string = '';
  @JsonMember({ elements: Equipment })
  powerUnitAssigned: Equipment;
  @JsonMember({ elements: Equipment })
  trailerAssigned: Equipment;
  @JsonMember
  paymentOption: DriverPaymentOptions;
  @JsonMember
  rate: number;
  @JsonMember({ elements: Contact })
  contact: Contact;
  @JsonMember
  type: DriverTypes;
  @JsonMember
  hireDate: Date = null;
  @JsonMember
  terminationDate: Date = null;
  @JsonMember
  status: DriverStatuses;
  @JsonMember
  notes: string = '';
  @JsonMember
  phone: string = '';
  @JsonMember
  lastTripNumber: number;
  @JsonMember
  lastAddress: string = '';


  static create(): Driver {
    const result = new Driver();
    result.dateOfBirth = new Date();
    result.hireDate = new Date();
    result.terminationDate = new Date();
    result.powerUnitAssigned = Equipment.create();
    result.trailerAssigned = Equipment.create();
    result.paymentOption = DriverPaymentOptions.PerMile;
    result.contact = Contact.create();
    result.type = DriverTypes.CompanyDriver;
    result.status = DriverStatuses.Active;
    return result;
  }

  public static getStatusText(status): string {
    return Driver.statusText[status];
  }

  public static getStatusColor(status: DriverStatuses): string {
    return statusColors[status];
  }

  public static getTypeText(type): string {
    return Driver.typeText[type];
  }
};
