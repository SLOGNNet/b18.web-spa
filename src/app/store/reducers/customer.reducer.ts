import { CustomerActions } from './actions';
import { createReducer } from './create-reducer';
import { Customer } from './models';
import { addItem, updateItem, removeItem } from './utils';

export interface ICustomerState {
    items: Customer[];
    selected: Customer;
}
const INITIAL_STATE: ICustomerState = { items: [], selected: null };

export const customerReducer = createReducer(INITIAL_STATE, {
  [CustomerActions.ADD_CUSTOMER](state, action) {
      return Object.assign({}, state, { items: addItem(state.customers, action.customer)});
  },
  [CustomerActions.REMOVE_CUSTOMER](state, action) {
    return Object.assign({}, state, { items: removeItem(state.customers, action.customer)});
  },
  [CustomerActions.UPDATE_CUSTOMER](state, action) {
    return Object.assign({}, state, { items: updateItem(state.customers, action.customer)});
  },
  [CustomerActions.GET_ALL_CUSTOMERS](state, action) {
    return Object.assign({}, state, { items: action.items, selected: null});
  },
  [CustomerActions.SELECT_CUSTOMER](state, action) {
    return Object.assign({}, state, { selected: action.customer});
  },
});
