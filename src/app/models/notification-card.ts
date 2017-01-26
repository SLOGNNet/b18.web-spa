export enum Type {
  New = 1,
  Add = 2,
  Error = 3
}

const typeColors = createEventTypeColors();

// Colors
function createEventTypeColors() {
 let result = {};
  result[Type.New] = '#ffbe4d';
  result[Type.Add] = '#85d183';
  result[Type.Error] = '#fb3a3a';

  return result;
};

export class NotificationCard {
  name: string;
  type: number;
  message: string;
  date: string;

  public static getTypeColor(type: Type): string {
    return typeColors[type];
  }
}
