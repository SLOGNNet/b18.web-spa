import { IAppState } from '../root-reducer';
import { ICompanyPageState } from '../reducers/companyPage';
import { denormalize } from 'normalizr';
import { companyListSchema, companySchema, Company } from '../../models';

const selectHydrationEntities = (state: ICompanyPageState) => {
  return { companies: state.companies.items, contacts: state.contacts.items };
};
export const selectCompanies = (state: IAppState): Company[] => { 
  const den = denormalize;
  const result =  den(state.companyPage.companies.list,
  companyListSchema,
  selectHydrationEntities(state.companyPage));
  return result;
}


export const selectCompany = (state: IAppState, id: string): Company => denormalize(id,
  companySchema,
  selectHydrationEntities(state.companyPage));

export const selectDetailCompany = (state: IAppState): Company => { 
  const res = selectCompany(state, state.companyPage.companies.selected);
  return res;
}
