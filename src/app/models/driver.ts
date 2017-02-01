import { Address, Contact, Equipment } from './index';
import { DriverTypes, DriverStatuses, DriverPaymentOptions} from './enums';

export class Driver {
  private static statusText = ['Inactive', 'Active', 'Unavaliable'];
  private static typeText = ['Company'];

  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date = null;
  snn: string = '';
  powerUnitAssigned: Equipment;
  trailerAssigned: Equipment;
  paymentOption: DriverPaymentOptions;
  rate: number;
  contact: Contact;
  type: DriverTypes;
  hireDate: Date = null;
  terminationDate: Date = null;
  status: DriverStatuses;
  notes: string = '';

  static create(): Driver {
    const result = new Driver();
    result.dateOfBirth = new Date();
    result.hireDate = new Date();
    result.terminationDate = new Date();
    result.powerUnitAssigned = Equipment.create();
    result.trailerAssigned = Equipment.create();
    result.paymentOption = DriverPaymentOptions.PerMile;
    result.contact = Contact.create();
    result.type = DriverTypes.Company;
    result.status = DriverStatuses.Active;
    return result;
  }

  public static getStatusText(status): string {
    return Driver.statusText[status];
  }

  public static getTypeText(type): string {
    return Driver.typeText[type];
  }
};
