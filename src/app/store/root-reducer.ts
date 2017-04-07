import { combineReducers } from 'redux';
import { loadReducer, ILoadState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
  IEquipmentState, equipmentReducer, IEntitiesState, entitiesReducer, IUiState, uiReducer } from './reducers';

export class IAppState {
  loads?: ILoadState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
  entities?: IEntitiesState;
  ui?: IUiState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  entities: entitiesReducer,
  ui: uiReducer
});

export const enhancers = [
];
