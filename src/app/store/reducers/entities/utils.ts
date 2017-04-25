import { mergeLists } from '../utils';
export * from '../utils';
export function mergeEntities(state, action, entityName) {
  return action.data && action.data.entities && action.data.entities[entityName] ?
    mergeLists(state, action.data.entities[entityName]) :
    state;
}
