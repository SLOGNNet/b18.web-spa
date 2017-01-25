import { Commodity, Address, Driver } from './index';
import { generateNewId } from './utils';


export enum NotificationType {
  Error = 1,
  Event = 2
};

export class Notification {
  id: number;
  content: string;
  type: NotificationType;

  static create(): Notification {
    const result = new Notification();
    result.id = generateNewId();
    result.type = NotificationType.Error;
    return result;
  }
}
