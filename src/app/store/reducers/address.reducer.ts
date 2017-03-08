import { AddressActions, CompanyActions } from './actions';
import { createReducer } from './create-reducer';
import { Address } from './models';
import { addItem, updateListItem, removeItem } from './utils';

export interface IAddressState {
    items: Address[];
}
const INITIAL_STATE: IAddressState = { items: [] };

export const addressReducer = createReducer(INITIAL_STATE, {
  [AddressActions.ADD_ADDRESS](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.address)});
  },
  [AddressActions.REMOVE_ADDRESS](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.address)});
  },
  [AddressActions.UPDATE_ADDRESS](state, action) {
    return Object.assign({}, state, { items: updateListItem(state.items, action.address)});
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { items: action.company.addresses});
  }
});
