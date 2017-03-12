import { LoadActions } from './actions';
import { createReducer } from './create-reducer';
import { Load } from './models';
import { addItem, updateListItem, removeItem } from './utils';

export interface ILoadState {
    items: Load[];
    selected: Load;
    isLoading: boolean;
}
const INITIAL_STATE: ILoadState = { items: [], selected: null, isLoading: false };

export const loadReducer = createReducer(INITIAL_STATE, {
  [LoadActions.ADD_LOAD_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [LoadActions.ADD_LOAD_SUCCESS](state, action) {
      return Object.assign({}, state, {
        items: addItem(state.items, action.load),
        isLoading: false
      });
  },
  [LoadActions.REMOVE_LOAD](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.load)});
  },
  [LoadActions.UPDATE_LOAD_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [LoadActions.UPDATE_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        items: updateListItem(state.items, action.load),
        isLoading: false
      });
  },
  [LoadActions.SELECT_LOAD](state, action) {
    return Object.assign({}, state, { selected: action.load});
  },
  [LoadActions.GET_ALL_LOADS](state, action) {
    return Object.assign({}, state, { items: action.items.slice(), selected: null});
  },
});
