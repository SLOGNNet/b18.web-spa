import { combineReducers } from 'redux';
import { loadReducer, ILoadState, customerReducer, ICustomerState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState, IEquipmentState, equipmentReducer } from './reducers';
export { ILoadState, ICustomerState, IEquipmentState, ICommodityState, IAddressState, IStopState } from './reducers';
export class IAppState {
  loads?: ILoadState;
  customers?: ICustomerState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  customers: customerReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer
});

export const enhancers = [
];
