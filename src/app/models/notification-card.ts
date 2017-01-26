export enum EventType {
  New = 1,
  Add = 2,
  Error = 3
}

const typeColors = createEventTypeColors();

// Colors
function createEventTypeColors() {
 let result = {};
  result[EventType.New] = '#ffbe4d';
  result[EventType.Add] = '#85d183';
  result[EventType.Error] = '#fb3a3a';

  return result;
};

export class NotificationCard {
  name: string;
  eventType: number;
  message: string;
  date: string;

  public static getEventTypeColor(eventType: EventType): string {
    return typeColors[eventType];
  }
}
