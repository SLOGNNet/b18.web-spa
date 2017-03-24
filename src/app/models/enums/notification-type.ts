export enum NotificationType {
  NOTIFICATION = 1,
  MESSAGE = 2,
  TASK = 3
};

let displayTexts = {
  [NotificationType.NOTIFICATION]: 'notification',
  [NotificationType.MESSAGE]: 'message',
  [NotificationType.TASK]: 'task'
};

export namespace NotificationType {
  export function displayText(type: NotificationType) {
    return displayTexts[type];
  }
}
