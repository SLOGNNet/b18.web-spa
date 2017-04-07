import { CommonActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Equipment } from '../models';
import { mergeEntities } from './utils';
const INITIAL_STATE = [];

export const equipmentReducer = createReducer(INITIAL_STATE, {
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'equipments');
  }
});
