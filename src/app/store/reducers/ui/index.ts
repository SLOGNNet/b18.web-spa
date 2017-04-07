import { combineReducers } from 'redux';
import { companyReducer, ICompanyState } from './company.reducer';
import { companyContactReducer, ICompanyContactState } from './contact.reducer';
import { driverReducer, IDriverState } from './driver.reducer';
import { companyLocationReducer, ICompanyLocationState } from './location.reducer';

export interface IUiState {
  companies: ICompanyState;
  contacts: ICompanyContactState;
  drivers: IDriverState;
  locations: ICompanyLocationState;
}

export const uiReducer = combineReducers({
  companies: companyReducer,
  contacts: companyContactReducer,
  drivers: driverReducer,
  locations: companyLocationReducer
});
