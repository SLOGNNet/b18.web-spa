export enum NotificationStatus {
  NEW = 1,
  ADD = 2,
  ERROR = 3
};

let statusColors = {
  [NotificationStatus.NEW]: '#ffbe4d',
  [NotificationStatus.ADD]: '#85d183',
  [NotificationStatus.ERROR]: '#fb3a3a',
};

export namespace NotificationStatus {
  export function color(notificationStatus: NotificationStatus) {
    return statusColors[notificationStatus];
  }
}
