import { combineReducers } from 'redux';
import { companyReducer, ICompanyState } from './company.reducer';
import { companyContactReducer, ICompanyContactState } from './contact.reducer';

export interface IUiState {
  companies: ICompanyState;
  contacts: ICompanyContactState;
}

export const uiReducer = combineReducers({
  companies: companyReducer,
  contacts: companyContactReducer
});
