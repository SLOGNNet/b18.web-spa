import { CommonActions, StopActionActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Stop } from '../models';
import { mergeEntities } from './utils';
import { addChild, removeChild } from '../normalizerUtils';
const INITIAL_STATE = [];

export const stopReducer = createReducer(INITIAL_STATE, {
  [StopActionActions.ADD_STOP_ACTION](state, action) {
    const stopId = action.stopId;
    const stopActionId = action.data.result;
    const result = addChild(state, stopId, 'stopActions', stopActionId);
    return result;
  },
  [StopActionActions.REMOVE_STOP_ACTION](state, action) {
    const stopId = action.stopId;
    const stopActionId = action.data.result;
    const result = addChild(state, stopId, 'stopActions', stopActionId);
    return result;
  },
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'stops');
  }
});
