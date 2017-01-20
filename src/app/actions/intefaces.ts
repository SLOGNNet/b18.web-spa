import { Observable } from 'rxjs/Observable';

export interface IDetailDataActions<T> {
  select(id: number);
  createNew();
}

export interface IListDataActions<T> {
  remove(removed: T);
  add(added: T);
  update(updated: T);
  getAll(): void;
}
