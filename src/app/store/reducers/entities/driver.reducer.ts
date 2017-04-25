import { CommonActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Driver } from '../models';
import { mergeEntities } from './utils';
const INITIAL_STATE = [];

export const driverReducer = createReducer(INITIAL_STATE, {
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'drivers');
  }
});
