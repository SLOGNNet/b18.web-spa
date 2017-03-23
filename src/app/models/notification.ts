import { Contact } from './index';
import { generateNewId } from './utils';
import { NotificationStatus, NotificationType, NotificationPriority, TaskType } from './enums';

const notificationsTaskTypeColors = createNotificationsTaskTypeColors();

// Colors for task types
function createNotificationsTaskTypeColors() {
 let result = {};
  result[TaskType.NEW] = '#75b3e1';
  result[TaskType.IN_PROGRESS] = '#ffbe4d';
  result[TaskType.DONE] = '#85d183';
  result[TaskType.ERROR] = '#fb3a3a';

  return result;
};


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

  public static getEventTypeColor(taskType: TaskType): string {
    return notificationsTaskTypeColors[taskType];
  }

}
