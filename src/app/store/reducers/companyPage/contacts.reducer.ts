import { CompanyActions, CompanyContactActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Contact } from '../models';
import { mergeLists } from '../normalizerUtils';
import { addItem, updateListItem, updateItem, updateNewItem } from '../utils';

export interface ICompanyContactState {
  items: Contact[];
  selected: Contact;
  isLoading: boolean;
}
const INITIAL_STATE: ICompanyContactState = { items: [], selected: null, isLoading: false };

export const companyContactReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { items: mergeLists(state.items, action.data.entities.contacts) });
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { items: action.data.entities.contacts, selected: null});
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
    return Object.assign({}, state,
      { items:
        addItem(state.items, action.contact),
        selected: updateNewItem(state.selected, action.contact, action.prevId),
        isLoading: false
     });
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