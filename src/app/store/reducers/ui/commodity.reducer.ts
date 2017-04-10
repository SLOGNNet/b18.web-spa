import { CommodityActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Commodity } from '../models';

export interface ICommodityState {
  list: string[];
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: ICommodityState = { list: [], selected: null, isLoading: false};

export const commodityReducer = createReducer(INITIAL_STATE, {
  [CommodityActions.ADD_COMMODITY](state, action) {
    return Object.assign({}, state, {
      list: [action.data.result, ...state.list]
    });
  },
  [CommodityActions.UPDATE_COMMODITY](state, action) {
    return Object.assign({}, state,
      {
        list: [action.data.result, ...state.list]
      });
  },
  [CommodityActions.REMOVE_COMMODITY](state, action) {
    return Object.assign({}, state,
      {
        list: [action.data.result, ...state.list]
      });
  },
  [CommodityActions.SELECT_COMMODITY](state, action) {
    const selected = action.result;
    selected.dropoffId = action.stop.id;
    return Object.assign({}, state, { selected: action.data.result, isLoading: false});
  },
});
