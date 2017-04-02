import { combineReducers } from 'redux';
import { companyReducer, ICompanyState } from './company.reducer';
import { companyContactReducer, ICompanyContactState } from './contacts.reducer';
import { Company, companyListSchema } from '../models';

export interface ICompanyPageState {
  companies: ICompanyState;
  contacts: ICompanyContactState;
}

export const companyPageReducer = combineReducers({
  companies: companyReducer,
  contacts: companyContactReducer
});
