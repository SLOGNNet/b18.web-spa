import { LoadActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Load } from '../models';

export interface ILoadState {
  list: string[];
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: ILoadState = { list: [], selected: null, isLoading: false};

export const loadReducer = createReducer(INITIAL_STATE, {
  [LoadActions.ADD_LOAD_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [LoadActions.ADD_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state, {
      list: [action.data.result, ...state.list],
      selected: action.prevId === state.selected ? action.data.result : state.selected,
      isLoading: false
    });
  },
  [LoadActions.UPDATE_LOAD_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [LoadActions.UPDATE_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        isLoading: false
      });
  },
  [LoadActions.GET_ALL_LOADS](state, action) {
    return Object.assign({}, state, { list: action.data.result });
  },
  [LoadActions.SELECT_LOAD_SUCCESS](state, action) {
    return Object.assign({}, state, { selected: action.data.result, isLoading: false});
  },
  [LoadActions.SELECT_LOAD_FAILURE](state) {
    return Object.assign({}, state, { selected: null, isLoading: false});
  },
});
