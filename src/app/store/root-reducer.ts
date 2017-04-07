import { combineReducers } from 'redux';
import { loadReducer, ILoadState,
  commodityReducer, ICommodityState, addressReducer, IAddressState, stopReducer, IStopState,
  driverReducer, IDriverState, IEquipmentState, equipmentReducer,
  locationReducer, ILocationState, IEntitiesState, entitiesReducer, IUiState, uiReducer } from './reducers';

export class IAppState {
  loads?: ILoadState;
  commodities?: ICommodityState;
  addresses?: IAddressState;
  stops?: IStopState;
  equipments?: IEquipmentState;
  drivers?: IDriverState;
  locations?: ILocationState;
  entities?: IEntitiesState;
  ui?: IUiState;
};

export const rootReducer = combineReducers<IAppState>({
  loads: loadReducer,
  commodities: commodityReducer,
  addresses: addressReducer,
  stops: stopReducer,
  equipments: equipmentReducer,
  drivers: driverReducer,
  locations: locationReducer,
  entities: entitiesReducer,
  ui: uiReducer
});

export const enhancers = [
];
