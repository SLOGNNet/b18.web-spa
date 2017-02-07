import { CommodityActions, LoadActions } from './actions';
import { createReducer } from './create-reducer';
import { Commodity, Load } from './models';
import { addItem, updateItem, removeItem } from './utils';
import { chain } from 'lodash';

export interface ICommodityState {
    items: Commodity[];
}
const INITIAL_STATE: ICommodityState = { items: [] };


export const commodityReducer = createReducer(INITIAL_STATE, {
  [CommodityActions.ADD_COMMODITY](state, action) {
      return Object.assign({}, state, { items: addItem(state.items, action.commodity)});
  },
  [CommodityActions.REMOVE_COMMODITY](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.commodity)});
  },
  [CommodityActions.UPDATE_COMMODITY](state, action) {
    return Object.assign({}, state, { items: updateItem(state.items, action.commodity)});
  },
  [CommodityActions.SELECT_COMMODITY](state, action) {
    const selected = action.commodity;
    selected.dropoffId = action.stop.id;
    return Object.assign({}, state, {
        items: updateItem(state.items, selected)
      });
  },
  [CommodityActions.DESELECT_COMMODITY](state, action) {
      const deselected = action.commodity;
      deselected.dropoffId = null;
      return Object.assign({}, state, {
          items: updateItem(state.items, deselected)
        });
  },
  [LoadActions.SELECT_LOAD](state, action) {
    const load: Load = action.load;
    const commodities = chain(load.commodities)
      .uniqBy(commodity => commodity.id)
      .value();
      console.log(commodities, 'commodities');
    return Object.assign({}, state, { items: commodities});
  },
});
