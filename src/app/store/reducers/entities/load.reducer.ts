import { CommonActions, CommodityActions, StopActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Load } from '../models';
import { mergeEntities, addChild, removeChild } from './utils';
const INITIAL_STATE = [];

export const loadReducer = createReducer(INITIAL_STATE, {
  [CommodityActions.ADD_COMMODITY](state, action) {
    const commodityId = action.data.result;
    const loadId = action.loadId;
    const result = addChild(state, loadId, 'commodities', commodityId);
    return result;
  },
  [CommodityActions.REMOVE_COMMODITY](state, action) {
    const commodityId = action.data.result;
    const loadId = action.loadId;
    const result = removeChild(state, loadId, 'commodities', commodityId);
    return result;
  },
  [StopActions.ADD_STOP_LOAD_SUCCESS](state, action) {
    const stopId = action.data.result;
    const loadId = action.loadId;
    const result = addChild(state, loadId, 'stops', stopId);
    return result;
  },
  [StopActions.REMOVE_STOP_LOAD_SUCCESS](state, action) {
    const stopId = action.data.result;
    const loadId = action.loadId;
    const result = removeChild(state, loadId, 'stops', stopId);
    return result;
  },
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'loads');
  }
});
