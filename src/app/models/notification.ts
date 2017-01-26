import { Commodity, Address, Driver, Contact } from './index';
import { generateNewId } from './utils';


export enum NotificationStatus {
  New = 1,
  Add = 2,
  Error = 3
};

export enum NotificationType {
  notification = 1,
  message = 2,
  event = 3
};

export enum NotificationPriority {
  High = 0,
  Middle = 1,
  Low = 2,
};

export enum TaskType {
  New = 1,
  InProgress = 2,
  Done = 3,
  Error = 4
}

const notificationsTaskTypeColors = createNotificationsTaskTypeColors();
const notificationsStatusColors = createNotificationsStatusColors();

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

  public static taskStatusText = ['HI', 'LO', 'ME'];

  id: number;
  title: string;
  type: NotificationType;
  date: Date;
  message: string;
  sender: Contact;
  taskType: TaskType;
  priority: NotificationPriority;
  notificationStatus: NotificationStatus;


  static create(): Notification {
    const result = new Notification();
    result.id = generateNewId();
    result.type = NotificationType.message;
    result.date = new Date();
    return result;
  }

  public static notificationStatusColor(notificationStatus: NotificationStatus): string {
    return notificationsStatusColors[notificationStatus];
  }

  public static getPriorityText(priority: NotificationPriority): string {
    return Notification.taskStatusText[priority];
  }

  public static getEventTypeColor(taskType: TaskType): string {
    return notificationsTaskTypeColors[taskType];
  }

}
