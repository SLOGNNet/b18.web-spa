import { Contact } from './index';
import { generateNewId } from './utils';
import { NotificationStatus, NotificationType, NotificationPriority, TaskType } from './enums';

const notificationsTaskTypeColors = createNotificationsTaskTypeColors();
const notificationsStatusColors = createNotificationsStatusColors();
const notificationPriorityText = createNotificationPriorityText();
const notificationTypeText = createNotificationTypeText();

// Type Text
function createNotificationTypeText() {
 let result = {};
  result[NotificationType.NOTIFICATION] = 'notification';
  result[NotificationType.MESSAGE] = 'message';
  result[NotificationType.TASK] = 'task';

  return result;
};

// Priority Text
function createNotificationPriorityText() {
 let result = {};
  result[NotificationPriority.HIGH] = 'HI';
  result[NotificationPriority.MIDDLE] = 'ME';
  result[NotificationPriority.LOW] = 'LO';

  return result;
};

// Colors for event statuses
function createNotificationsStatusColors() {
 let result = {};
  result[NotificationStatus.NEW] = '#ffbe4d';
  result[NotificationStatus.ADD] = '#85d183';
  result[NotificationStatus.ERROR] = '#fb3a3a';

  return result;
};

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
