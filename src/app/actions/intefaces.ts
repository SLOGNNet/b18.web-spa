export interface IDetailDataActions<T> {
  select(id: any);
  createNew();
  add(added: T);
  update(updated: T);
  remove(removed: T);
}

export interface IListDataActions<T> {
  getAll(): void;
}
