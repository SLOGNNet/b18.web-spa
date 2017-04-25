export * from '../../models';


export interface IEntity<T> {
  [id: string]: T;
}
