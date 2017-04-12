import { CommonActions, CommodityActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Load } from '../models';
import { mergeEntities, addChild, removeChild } from './utils';
const INITIAL_STATE = [];

export const loadReducer = createReducer(INITIAL_STATE, {
 [CommodityActions.ADD_COMMODITY](state, action) {
    const commodityId = action.commodityId;
    const loadId = action.loadId;
    const result = addChild(state, loadId, 'commodities', commodityId);
    return result;
  },
  [CommodityActions.REMOVE_COMMODITY](state, action) {
    const commodityId = action.commodityId;
    const loadId = action.loadId;
    const result = removeChild(state, loadId, 'commodities', commodityId);
    return result;
  },
  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'loads');
  }
});
