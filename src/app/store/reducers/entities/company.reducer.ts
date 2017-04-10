import { CommonActions, CompanyContactActions, CompanyLocationActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Company, Contact } from '../models';
import { Equipment } from '../models';
import { mergeEntities } from './utils';
const INITIAL_STATE = [];

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const contactId = action.data.result;
    const result =
    {
      ...state,
        [companyId]: {
          ...state[companyId],
          contacts: [contactId, ...state[companyId].contacts]
        }
    };
    return result;
  },
  [CompanyLocationActions.ADD_LOCATION_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const locationId = action.data.result;
    const result =
    {
      ...state,
        [companyId]: {
          ...state[companyId],
          locations: [locationId, ...state[companyId].locations]
        }
    };
    return result;
  },

  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'companies');
  }
});
