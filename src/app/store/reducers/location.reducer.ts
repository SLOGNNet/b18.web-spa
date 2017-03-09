import { LocationActions, CompanyActions } from './actions';
import { createReducer } from './create-reducer';
import { Location } from './models';
import { addItem, updateListItem, updateItem, removeItem } from './utils';

export interface ILocationState {
  items: Location[];
}
const INITIAL_STATE: ILocationState = { items: [] };

export const locationReducer = createReducer(INITIAL_STATE, {
  [LocationActions.ADD_LOCATION](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.location) });
  },
  [LocationActions.REMOVE_LOCATION](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.location) });
  },
  [LocationActions.UPDATE_LOCATION](state, action) {
    return Object.assign({}, state, { items: updateListItem(state.items, action.location) });
  },
  [LocationActions.UPDATE_SELECTED_LOCATION_ADDRESS](state, action) {
    return Object.assign({}, state,
      {
        items: updateListItem(state.items, action.location),
        isLoading: false
      });
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { items: action.company.locations });
  }
});
