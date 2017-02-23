import { Commodity, Address, Driver, Contact } from './index';
import { generateNewId } from './utils';
import { NotificationStatus, NotificationType, NotificationPriority, TaskType } from './enums';

const notificationsTaskTypeColors = createNotificationsTaskTypeColors();
const notificationsStatusColors = createNotificationsStatusColors();
const notificationPriorityText = createNotificationPriorityText();
const notificationTypeText = createNotificationTypeText();

// Type Text
function createNotificationTypeText() {
 let result = {};
  result[NotificationType.Notification] = 'notification';
  result[NotificationType.Message] = 'message';
  result[NotificationType.Task] = 'task';

  return result;
};

// Priority Text
function createNotificationPriorityText() {
 let result = {};
  result[NotificationPriority.High] = 'HI';
  result[NotificationPriority.Middle] = 'ME';
  result[NotificationPriority.Low] = 'LO';

  return result;
};

// Colors for event statuses
function createNotificationsStatusColors() {
 let result = {};
  result[NotificationStatus.New] = '#ffbe4d';
  result[NotificationStatus.Add] = '#85d183';
  result[NotificationStatus.Error] = '#fb3a3a';

  return result;
};

// Colors for task types
function createNotificationsTaskTypeColors() {
 let result = {};
  result[TaskType.New] = '#75b3e1';
  result[TaskType.InProgress] = '#ffbe4d';
  result[TaskType.Done] = '#85d183';
  result[TaskType.Error] = '#fb3a3a';

  return result;
};


export class Notification {

  id: number;
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
    result.type = NotificationType.Message;
    result.date = new Date();
    return result;
  }

  public static notificationStatusColor(notificationStatus: NotificationStatus): string {
    return notificationsStatusColors[notificationStatus];
  }

  public static getPriorityText(priority: NotificationPriority): string {
    return notificationPriorityText[priority];
  }

  public static getTypeText(type: NotificationType): string {
    return notificationTypeText[type];
  }

  public static getEventTypeColor(taskType: TaskType): string {
    return notificationsTaskTypeColors[taskType];
  }

}
