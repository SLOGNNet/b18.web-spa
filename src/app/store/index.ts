import { combineReducers } from 'redux';
import { loadReducer, ILoadState, customerReducer, ICustomerState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState, driverReducer, IDriverState } from './reducers';
export { ILoadState, ICustomerState, ICommodityState, IAddressState, IStopState, IDriverState } from './reducers';
export class IAppState {
  loads?: ILoadState;
  customers?: ICustomerState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  drivers?: IDriverState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  customers: customerReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  drivers: driverReducer
});

export const enhancers = [
];
