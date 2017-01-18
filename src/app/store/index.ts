import { combineReducers } from 'redux';
import { loadReducer, ILoadState, customerReducer, ICustomerState,
  commodityReducer, ICommodityState, addressReducer, IAddressState } from './reducers';
export { ILoadState, ICustomerState, ICommodityState, IAddressState} from './reducers';
export class IAppState {
  loads?: ILoadState;
  customers?: ICustomerState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  customers: customerReducer,
  commodities: commodityReducer,
  addresses: addressReducer
});

export const enhancers = [
];
