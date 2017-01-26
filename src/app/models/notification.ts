import { Commodity, Address, Driver, Contact } from './index';
import { generateNewId } from './utils';

export enum NotificationType {
  notification = 1,
  message = 2,
  event = 3
};

export class Notification {
  id: number;
  content: string;
  type: NotificationType;
  date: Date;
  message: string;
  sender: Contact;


  static create(): Notification {
    const result = new Notification();
    result.id = generateNewId();
    result.type = NotificationType.message;
    result.date = new Date()
    return result;
  }

}
