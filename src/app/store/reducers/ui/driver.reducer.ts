import { DriverActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Driver } from '../models';

export interface IDriverState {
  list: string[];
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: IDriverState = { list: [], selected: null, isLoading: false};

export const driverReducer = createReducer(INITIAL_STATE, {
  [DriverActions.ADD_DRIVER_REQUEST](state, action) {
    return Object.assign({}, state, {
      selected: action.data.result,
      isLoading: true
    });
  },
  [DriverActions.ADD_DRIVER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      list: [action.data.result, ...state.list],
      selected: action.prevId === state.selected ? action.data.result : state.selected,
      isLoading: false
    });
  },
  [DriverActions.UPDATE_DRIVER_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        selected: action.data.result,
        isLoading: true
      });
  },
  [DriverActions.UPDATE_DRIVER_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        isLoading: false
      });
  },
  [DriverActions.GET_ALL_DRIVERS](state, action) {
    return Object.assign({}, state, { list: action.data.result });
  },
  [DriverActions.SELECT_DRIVER](state, action) {
    return Object.assign({}, state, { selected: action.data.result, isLoading: false});
  },
});
