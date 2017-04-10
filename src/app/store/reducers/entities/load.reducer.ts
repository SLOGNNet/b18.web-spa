import { CommonActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Load } from '../models';
import { mergeEntities } from './utils';
const INITIAL_STATE = [];

export const loadReducer = createReducer(INITIAL_STATE, {
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'loads');
  }
});
