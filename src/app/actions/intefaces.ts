import { Observable } from 'rxjs/Observable';

export interface IDetailDataActions<T> {
  select(id: number);
  createNew();
  add(added: T);
  update(updated: T);
  remove(removed: T);
}

export interface IListDataActions<T> {
  getAll(): void;
}
