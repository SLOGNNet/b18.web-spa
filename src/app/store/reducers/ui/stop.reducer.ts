import { CompanyActions, StopActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Contact } from '../models';
import { mergeLists } from '../utils';

export interface ILoadStopState {
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: ILoadStopState = { selected: null, isLoading: false };

export const loadStopReducer = createReducer(INITIAL_STATE, {
  [StopActions.ADD_STOP_LOAD_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [StopActions.ADD_STOP_LOAD_SUCCESS](state, action) {
    const res = Object.assign({}, state,
    {
        selected: action.prevId === state.selected ? action.data.result : state.selected,
        isLoading: false
    });
    return res;
  },
  [StopActions.SELECT_STOP_LOAD](state, action) {
    return Object.assign({}, state, { selected: action.data.result, isLoading: false });
  },
  [StopActions.REMOVE_STOP_LOAD_SUCCESS](state, action) {
    const res = Object.assign({}, state,
    {
        selected: action.data.result === state.selected ? null : state.selected,
    });
    return res;
  },
  [StopActions.UPDATE_STOP_LOAD_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [StopActions.UPDATE_STOP_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        isLoading: false
      });
  },
});
