import { slice, take } from 'lodash';

export function getPaginated(items: Array<any>, page: number = 0, count: number = 2) {
  const offset = (page - 1) * count;
  const paginatedItems = take(slice(items, offset), count);
  return paginatedItems;
}


let id = 0;
export function generateNewId(): string {
  return (--id).toString();
}

let pesistId = 1000;
export function generatePersistId() {
  return (pesistId++).toString();
}
