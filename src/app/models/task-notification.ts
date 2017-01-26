export enum NotificationPriority {
  High = 0,
  Middle = 1,
  Low = 2,
}

export enum EventType {
  New = 1,
  InProgress = 2,
  Done = 3,
  Error = 4
}

const eventStatusColors = createEventStatusColors();

// Colors
function createEventStatusColors() {
 let result = {};
  result[EventType.New] = '#75b3e1';
  result[EventType.InProgress] = '#ffbe4d';
  result[EventType.Done] = '#85d183';
  result[EventType.Error] = '#fb3a3a';

  return result;
};

export class TaskNotification {
  name: string;
  eventType: EventType;
  message: string;
  priority: NotificationPriority;
  date: string;

  private static statusText = ['HI', 'LO', 'ME'];

  public static getPriorityText(priority: NotificationPriority): string {
    return TaskNotification.statusText[priority];
  }

  public static getEventTypeColor(eventType: EventType): string {
    return eventStatusColors[eventType];
  }
}
