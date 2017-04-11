import { combineReducers } from 'redux';
import { loadReducer, ILoadState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
 IEntitiesState, entitiesReducer, IUiState, uiReducer } from './reducers';

export class IAppState {
  loads?: ILoadState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  entities?: IEntitiesState;
  ui?: IUiState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  entities: entitiesReducer,
  ui: uiReducer
});

export const enhancers = [
];
