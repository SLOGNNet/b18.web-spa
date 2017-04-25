import { CommonActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Contact } from '../models';
import { Equipment } from '../models';
import { mergeEntities } from './utils';
const INITIAL_STATE = [];

export const contactReducer = createReducer(INITIAL_STATE, {
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'contacts');
  }
});
