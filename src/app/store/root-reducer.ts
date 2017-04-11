import { combineReducers } from 'redux';
import { IEntitiesState, entitiesReducer, IUiState, uiReducer } from './reducers';

export class IAppState {
  entities?: IEntitiesState;
  ui?: IUiState;
};

export const rootReducer = combineReducers<IAppState>({
  entities: entitiesReducer,
  ui: uiReducer
});

export const enhancers = [
];
