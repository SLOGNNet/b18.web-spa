import { Contact } from './index';
import { generateNewId } from './utils';
import { NotificationStatus, NotificationType, NotificationPriority, TaskType } from './enums';

export class Notification {

  id: string;
  title: string;
  type: NotificationType;
  date: Date;
  message: string;
  sender: Contact;
  taskType: TaskType;
  priority: NotificationPriority;
  notificationStatus: NotificationStatus;
  isViewed: boolean;


  static create(): Notification {
    const result = new Notification();
    result.id = generateNewId();
    result.type = NotificationType.MESSAGE;
    result.date = new Date();
    return result;
  }

}
