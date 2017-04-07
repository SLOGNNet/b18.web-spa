import { CompanyActions, CompanyContactActions, CommonActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Company, Contact, IEntity } from '../models';
import { updateItem, deleteItem, addItem, mergeLists } from '../normalizerUtils';
import { omit } from 'lodash';
export interface ICompanyState {
    list: string[];
    selected: string;
    isLoading: boolean;
}

const INITIAL_STATE: ICompanyState = { selected: null, list: [], isLoading: false };

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyActions.ADD_COMPANY_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [CompanyActions.ADD_COMPANY_SUCCESS](state, action) {
      const res = Object.assign({}, state, {
        isLoading: false,
        list: [action.data.result, ...state.list],
        selected: action.prevId = state.selected ? action.data.result : state.selected
      });
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
        isLoading: false
      });
      return res;
  },
  [CompanyActions.GET_ALL_COMPANIES](state, action) {
    return Object.assign({}, state, { list: action.data.result, selected: null});
  },
  [CompanyActions.SELECT_COMPANY](state, action) {
    return Object.assign({}, state, { selected: action.data.result });
  }
});
