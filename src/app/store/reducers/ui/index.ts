import { combineReducers } from 'redux';
import { companyReducer, ICompanyState } from './company.reducer';
import { companyContactReducer, ICompanyContactState } from './contact.reducer';
import { driverReducer, IDriverState } from './driver.reducer';
import { equipmentReducer, IEquipmentState } from './equipment.reducer';
import { companyLocationReducer, ICompanyLocationState } from './location.reducer';
import { loadReducer, ILoadState } from './load.reducer';
import { commodityReducer, ICommodityState } from './commodity.reducer';

export interface IUiState {
  companies: ICompanyState;
  contacts: ICompanyContactState;
  drivers: IDriverState;
  equipments: IEquipmentState;
  locations: ICompanyLocationState;
  loads: ILoadState;
  commodities: ICommodityState;
}

export const uiReducer = combineReducers({
  companies: companyReducer,
  contacts: companyContactReducer,
  drivers: driverReducer,
  equipments: equipmentReducer,
  locations: companyLocationReducer,
  loads: loadReducer,
  commodities: commodityReducer
});
