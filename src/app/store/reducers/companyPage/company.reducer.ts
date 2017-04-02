import { CompanyActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Company, Contact, IEntity } from '../models';
import { updateItem, deleteItem, addItem, mergeLists } from '../normalizerUtils';
import { omit } from 'lodash';
export interface ICompanyState {
    items: IEntity<Company>[];
    list: string[];
    selected: string;
    isLoading: boolean;
}


const INITIAL_STATE: ICompanyState = { items: [], selected: null, list: [], isLoading: false };

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.ADD_COMPANY_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [CompanyActions.ADD_COMPANY_SUCCESS](state, action) {
      const res = Object.assign({}, state, {
        items: deleteItem(mergeLists(state.items, action.data.entities.companies), action.prevId),
        isLoading: false,
        list: [action.data.result, ...state.list],
        selected: action.prevId = state.selected ? action.data.result : state.selected
      });
      debugger;
      return res;
  },
  [CompanyActions.UPDATE_COMPANY_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [CompanyActions.UPDATE_COMPANY_SUCCESS](state, action) {
    const res =  Object.assign({}, state,
      {
        items: mergeLists(state.items, action.data.entities.companies),
        isLoading: false
      });
      debugger;
      return res;
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { items: action.data.entities.companies, list: action.data.result, selected: null});
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    debugger;
   const t = mergeLists;
    return Object.assign({}, state, { selected: action.data.result, items: mergeLists(state.items, action.data.entities.companies)});
  },
});
