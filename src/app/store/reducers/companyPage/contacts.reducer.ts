import { CompanyActions, CompanyContactActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Contact } from '../models';
import { mergeLists, deleteItem } from '../normalizerUtils';

export interface ICompanyContactState {
  items: Contact[];
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: ICompanyContactState = { items: [], selected: null, isLoading: false };

export const companyContactReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { items: mergeLists(state.items, action.data.entities.contacts) });
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { items: mergeLists(state.items, action.data.entities.contacts)});
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        items: deleteItem(mergeLists(state.items, action.data.entities.companies), action.prevId),
        selected: action.prevId = state.selected ? action.data.result : state.selected,
        isLoading: false
     });
  },
  [CompanyContactActions.SELECT_COMPANY_CONTACT](state, action) {
    return Object.assign({}, state, { selected: action.data.result, isLoading: false });
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
        items: mergeLists(state.items, action.data.entities.contacts),
        isLoading: false
      });
  },
});
