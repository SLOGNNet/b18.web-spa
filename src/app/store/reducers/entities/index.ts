import { combineReducers } from 'redux';
import { companyReducer } from './company.reducer';
import { contactReducer } from './contact.reducer';
import { driverReducer } from './driver.reducer';
import { equipmentReducer } from './equipment.reducer';
import { loadReducer } from './load.reducer';
import { commodityReducer } from './commodity.reducer';

export interface IEntitiesState {
  companies: Array<any>;
  contacts: Array<any>;
  drivers: Array<any>;
  equipments: Array<any>;
  loads: Array<any>;
  commodities: Array<any>;
}

export const entitiesReducer = combineReducers({
  companies: companyReducer,
  contacts: contactReducer,
  drivers: driverReducer,
  equipments: equipmentReducer,
  loads: loadReducer,
  commodities: commodityReducer
});
