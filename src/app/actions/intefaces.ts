export interface IDetailDataActions<T> {
  select(id: number);
  createNew();
  add?(added: T): void;
  addChild?(parent: any, added: T): void;
  update(updated: T);
  remove(removed: T);
}

export interface IListDataActions<T> {
  getAll(): void;
}
