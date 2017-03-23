import { CompanyActions } from './actions';
import { createReducer } from './create-reducer';
import { Company } from './models';
import { addItem, updateItem, updateListItem, updateNewItem, removeItem } from './utils';
import { omit } from 'lodash';

export interface ICompanyState {
    items: Company[];
    selected: Company;
    isLoading: boolean;
}
const INITIAL_STATE: ICompanyState = { items: [], selected: null, isLoading: false };

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.ADD_COMPANY_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [CompanyActions.ADD_COMPANY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        items: addItem(state.items, action.company),
        selected: updateNewItem(state.selected, action.company, action.prevId),
        isLoading: false
      });
  },
  [CompanyActions.REMOVE_COMPANY](state, action) {
    return Object.assign({}, state, { items: removeItem(state.companies, action.company)});
  },
  [CompanyActions.UPDATE_COMPANY_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [CompanyActions.UPDATE_COMPANY_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        items: updateListItem(state.items, action.company),
        selected: updateItem(state.selected, action.company),
        isLoading: false
      });
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { items: action.items.slice(), selected: null});
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { selected: omit(action.company, 'contacts')});
  },
});
