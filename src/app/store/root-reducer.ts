import { combineReducers } from 'redux';
import { loadReducer, ILoadState, companyReducer, companyContactReducer, ICompanyState, ICompanyContactState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
  driverReducer, IDriverState, IEquipmentState, equipmentReducer, locationReducer, ILocationState } from './reducers';

export class IAppState {
  loads?: ILoadState;
  companies?: ICompanyState;
  contacts?: ICompanyContactState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
  drivers?: IDriverState;
  locations?: ILocationState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  companies: companyReducer,
  contacts: companyContactReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  drivers: driverReducer,
  locations: locationReducer
});

export const enhancers = [
];
