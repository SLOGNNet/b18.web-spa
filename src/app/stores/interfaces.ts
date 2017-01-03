import { Observable } from 'rxjs/Observable';

export interface IListDataStore<T> {
  remove(removed: T);
  add(added: T);
  update(updated: T);
  items(): Observable<Array<T>>;
  selectedItem(): Observable<T>;
  getAll(): void;
  select(id: any);
}
