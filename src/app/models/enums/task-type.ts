export enum TaskType {
  NEW = 1,
  IN_PROGRESS = 2,
  DONE = 3,
  ERROR = 4
}

let statusColors = {
  [TaskType.NEW]: '#75b3e1',
  [TaskType.IN_PROGRESS]: '#ffbe4d',
  [TaskType.DONE]: '#85d183',
  [TaskType.ERROR]: '#fb3a3a'
};

export namespace TaskType {
  export function color(taskType: TaskType) {
    return statusColors[taskType];
  }
}
