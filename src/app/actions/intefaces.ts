export interface IDetailDataActions<T> {
  select(id: any);
}

export interface IEditDataActions<T> {
  createNew();
  select(id: any);
}

export interface IRootEditDataActions<T> extends IEditDataActions<T> {
  add(added: T): void;
  update(updated: T);
  remove(removed: T);
}

export interface INestedEditDataActions<T, Y> extends IEditDataActions<T> {
  addAssociation(added: T, parent: Y): void;
  updateAssociation?(added: T, parent: Y): void;
}

export interface IListDataActions<T> {
  getAll(): void;
}
