import { CommodityActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Commodity } from '../models';

export interface ICommodityState {
}
const INITIAL_STATE: ICommodityState = { };

export const commodityReducer = createReducer(INITIAL_STATE, {

});
