import { StopActions, LoadActions } from './actions';
import { createReducer } from './create-reducer';
import { Stop } from './models';
import { addItem, updateListItem, removeItem } from './utils';

export interface IStopState {
    items: Stop[];
}
const INITIAL_STATE: IStopState = { items: [] };

export const stopReducer = createReducer(INITIAL_STATE, {
  [StopActions.ADD_STOP](state, action) {
    return Object.assign({}, state, { items: addItem(state.items, action.stop, action.stop.id)});
  },
  [StopActions.REMOVE_STOP](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.stop)});
  },
  [StopActions.UPDATE_STOP](state, action) {
    return Object.assign({}, state, { items: updateListItem(state.items, action.stop)});
  },
  [LoadActions.SELECT_LOAD](state, action) {
    debugger;
    const load = action.data.entities.loads[action.data.result];
    return Object.assign({}, state, { items: load.stops});
  }
});
