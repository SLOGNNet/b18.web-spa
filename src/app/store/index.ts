import { combineReducers } from 'redux';
import { loadReducer, ILoadState, customerReducer, ICustomerState,
commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer,
equipmentReducer, IStopState, driverReducer, IDriverState, IEquipmentState } from './reducers';
export { ILoadState, ICustomerState, ICommodityState, IEquipmentState, IAddressState, IStopState, IDriverState } from './reducers';

export class IAppState {
  loads?: ILoadState;
  customers?: ICustomerState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
  drivers?: IDriverState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  customers: customerReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  drivers: driverReducer
});

export const enhancers = [
];
