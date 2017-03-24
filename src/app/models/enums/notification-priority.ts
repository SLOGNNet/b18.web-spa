export enum NotificationPriority {
  HIGH = 1,
  MIDDLE = 2,
  LOW = 3,
};

let displayTexts = {
  [NotificationPriority.HIGH]: 'HI',
  [NotificationPriority.MIDDLE]: 'ME',
  [NotificationPriority.LOW]: 'LO'
};

export namespace NotificationPriority {
  export function displayText(priority: NotificationPriority) {
    return displayTexts[priority];
  }
}
