import { combineReducers } from 'redux';
import { loadReducer, ILoadState, companyPageReducer, ICompanyPageState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
  driverReducer, IDriverState, IEquipmentState, equipmentReducer, locationReducer, ILocationState } from './reducers';

export class IAppState {
  loads?: ILoadState;
  companyPage?: ICompanyPageState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
  drivers?: IDriverState;
  locations?: ILocationState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  companyPage: companyPageReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  drivers: driverReducer,
  locations: locationReducer
});

export const enhancers = [
];
