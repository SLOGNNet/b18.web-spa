import { CommonActions, CompanyContactActions, CompanyLocationActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Company, Contact } from '../models';
import { Equipment } from '../models';
import { mergeEntities, addChild, removeChild } from './utils';
const INITIAL_STATE = [];

export const companyReducer = createReducer(INITIAL_STATE, {
  [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const contactId = action.data.result;
    const result = addChild(state, companyId, 'contacts', contactId);
    return result;
  },
  [CompanyContactActions.REMOVE_COMPANY_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const contactId = action.data.result;
    const result = removeChild(state, companyId, 'contacts', contactId);
    return result;
  },
  [CompanyLocationActions.ADD_LOCATION_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const locationId = action.data.result;
    const result = addChild(state, companyId, 'locations', locationId);
    return result;
  },
  [CompanyLocationActions.REMOVE_LOCATION_CONTACT_SUCCESS](state, action) {
    const companyId = action.companyId;
    const locationId = action.data.result;
    const result = removeChild(state, companyId, 'locations', locationId);
    return result;
  },
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'companies');
  }
});
