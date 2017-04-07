import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { companyListSchema, companySchema, Company } from '../../models';

export const selectCompanies = (state: IAppState): Company[] => {
  const result =  denormalize(state.ui.companies.list,
  companyListSchema,
  state.entities);
  return result;
};

export const selectCompany = (state: IAppState, id: string): Company => denormalize(id,
  companySchema,
  state.entities);

export const selectDetailCompany = (state: IAppState): Company => {
  return selectCompany(state, state.ui.companies.selected);
};

