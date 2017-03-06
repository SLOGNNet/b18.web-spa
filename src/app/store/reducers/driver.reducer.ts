import { DriverActions } from './actions';
import { createReducer } from './create-reducer';
import { Driver } from './models';
import { addItem, updateItem, updateListItem, removeItem } from './utils';

export interface IDriverState {
    items: Driver[];
    selected: Driver;
}
const INITIAL_STATE: IDriverState = { items: [], selected: null };

export const driverReducer = createReducer(INITIAL_STATE, {
  [DriverActions.ADD_DRIVER](state, action) {
      return Object.assign({}, state, {
        items: addItem(state.items, action.driver),
        selected: updateItem(state.selected, action.driver)
      });
  },
  [DriverActions.REMOVE_DRIVER](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.driver)});
  },
  [DriverActions.UPDATE_DRIVER](state, action) {
    return Object.assign({}, state,
      { items: updateListItem(state.items, action.driver),
        selected: updateItem(state.selected, action.driver)
      });
  },
  [DriverActions.GET_ALL_DRIVERS](state, action) {
    return Object.assign({}, state, { items: action.items.slice(), selected: null});
  },
  [DriverActions.SELECT_DRIVER](state, action) {
    return Object.assign({}, state, { selected: action.driver});
  },
});
