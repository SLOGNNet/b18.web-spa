import { CompanyActions } from './actions';
import { createReducer } from './create-reducer';
import { Company } from './models';
import { addItem, updateListItem, removeItem } from './utils';

export interface ICompanyState {
    items: Company[];
    selected: Company;
}
const INITIAL_STATE: ICompanyState = { items: [], selected: null };

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.ADD_COMPANY](state, action) {
      return Object.assign({}, state, { items: addItem(state.companies, action.company)});
  },
  [CompanyActions.REMOVE_COMPANY](state, action) {
    return Object.assign({}, state, { items: removeItem(state.companies, action.company)});
  },
  [CompanyActions.UPDATE_COMPANY](state, action) {
    return Object.assign({}, state, { items: updateListItem(state.companies, action.company)});
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { items: action.items.slice(), selected: null});
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { selected: action.company});
  },
});
