import { StopActions, LoadActions } from './actions';
import { createReducer } from './create-reducer';
import { Stop, Load } from './models';
import { addItem, updateItem, removeItem } from './utils';

export interface IStopState {
    items: Stop[];
}
const INITIAL_STATE: IStopState = { items: [] };

export const stopReducer = createReducer(INITIAL_STATE, {
  [StopActions.ADD_STOP](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.stop)});
  },
  [StopActions.REMOVE_STOP](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.stop)});
  },
  [StopActions.UPDATE_STOP](state, action) {
    return Object.assign({}, state, { items: updateItem(state.items, action.stop)});
  },
  [LoadActions.SELECT_LOAD](state, action) {
    return Object.assign({}, state, { items: action.load.stops});
  }
});
