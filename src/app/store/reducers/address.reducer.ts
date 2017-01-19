import { AddressActions, CustomerActions } from './actions';
import { createReducer } from './create-reducer';
import { Address } from './models';
import { addItem, updateItem, removeItem } from './utils';

export interface IAddressState {
    addresses: Address[];
}
const INITIAL_STATE: IAddressState = { addresses: [] };

export const addressReducer = createReducer(INITIAL_STATE, {
  [AddressActions.ADD_ADDRESS](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.address)});
  },
  [AddressActions.REMOVE_ADDRESS](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.address)});
  },
  [AddressActions.UPDATE_ADDRESS](state, action) {
    return Object.assign({}, state, { items: updateItem(state.items, action.address)});
  },
  [CustomerActions.SELECT_CUSTOMER](state, action) {
    return Object.assign({}, state, { items: action.customer.addresses});
  }
});
