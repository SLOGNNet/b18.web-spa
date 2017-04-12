import { CommonActions, CommodityActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Stop } from '../models';
import { mergeEntities, addChild, removeChild  } from './utils';

const INITIAL_STATE = [];

export const stopActionReducer = createReducer(INITIAL_STATE, {
  [CommodityActions.SELECT_COMMODITY](state, action) {
    const commodityId = action.commodity;
    const stopActionId = action.data.result;
    const result =  addChild(state, stopActionId, 'commodities', commodityId);
    return result;
  },
  [CommodityActions.DESELECT_COMMODITY](state, action) {
    const commodityId = action.commodity;
    const stopActionId = action.data.result;
    const result = addChild(state, stopActionId, 'commodities', commodityId);
    return result;
  },

  [CommonActions.DEFAULT](state, action) {
    return mergeEntities(state, action, 'stopActions');
  }
});
