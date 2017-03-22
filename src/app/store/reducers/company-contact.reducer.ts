import { CompanyActions, CompanyContactActions } from './actions';
import { createReducer } from './create-reducer';
import { Contact } from './models';
import { addItem, updateItem, updateListItem, removeItem } from './utils';

export interface ICompanyContactState {
  items: Contact[];
  selected: Contact;
  isLoading: boolean;
}
const INITIAL_STATE: ICompanyContactState = { items: [], selected: null, isLoading: false };

export const companyContactReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { items: action.company.contacts, isLoading: false });
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true,
      selected: action.contact
    });
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.contact), selected: Object.assign({}, action.contact), isLoading: false });
  },
  [CompanyContactActions.SELECT_COMPANY_CONTACT](state, action) {
    return Object.assign({}, state, { selected: action.contact, isLoading: false });
  },
  [CompanyContactActions.UPDATE_COMPANY_CONTACT_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [CompanyContactActions.UPDATE_COMPANY_CONTACT_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        items: updateListItem(state.items, action.contact),
        selected: updateItem(state.selected, action.contact),
        isLoading: false
      });
  },
});
