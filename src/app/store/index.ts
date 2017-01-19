import { combineReducers } from 'redux';
import { loadReducer, ILoadState, customerReducer, ICustomerState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState } from './reducers';
export { ILoadState, ICustomerState, ICommodityState, IAddressState, IStopState } from './reducers';
export class IAppState {
  loads: ILoadState;
  customers: ICustomerState;
  commodities: ICommodityState;
  addresses: IAddressState;
  stops: IStopState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  customers: customerReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer
});

export const enhancers = [
];
