import { LoadActions } from './actions';
import { createReducer } from './create-reducer';
import { Load } from './models';
import { addItem, updateItem, removeItem } from './utils';

export interface ILoadState {
    items: Load[];
    selected: Load;
}
const INITIAL_STATE: ILoadState = { items: [], selected: null };

export const loadReducer = createReducer(INITIAL_STATE, {
  [LoadActions.ADD_LOAD](state, action) {
      return Object.assign({}, state, { items: addItem(state.items, action.load)});
  },
  [LoadActions.REMOVE_LOAD](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.load)});
  },
  [LoadActions.UPDATE_LOAD](state, action) {
    return Object.assign({}, state, { items: updateItem(state.items, action.load)});
  },
  [LoadActions.SELECT_LOAD](state, action) {
    return Object.assign({}, state, { selected: action.load});
  },
  [LoadActions.GET_ALL_LOADS](state, action) {
    return Object.assign({}, state, { items: action.items, selected: null});
  },
});
