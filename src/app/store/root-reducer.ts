import { combineReducers } from 'redux';
import { commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
 IEntitiesState, entitiesReducer, IUiState, uiReducer } from './reducers';

export class IAppState {
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  entities?: IEntitiesState;
  ui?: IUiState;
};

export const rootReducer = combineReducers<IAppState>({
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  entities: entitiesReducer,
  ui: uiReducer
});

export const enhancers = [
];
