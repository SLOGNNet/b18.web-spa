import { combineReducers } from 'redux';
import { loadReducer, ILoadState, companyReducer, ICompanyState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
  driverReducer, IDriverState, IEquipmentState, equipmentReducer, locationReducer, ILocationState } from './reducers';
export { ILoadState, ICompanyState, ICommodityState, IAddressState, IStopState, IDriverState, IEquipmentState } from './reducers';

export class IAppState {
  loads?: ILoadState;
  companies?: ICompanyState;
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
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  drivers: driverReducer,
  locations: locationReducer
});

export const enhancers = [
];
