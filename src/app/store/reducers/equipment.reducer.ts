import { EquipmentActions } from './actions';
import { createReducer } from './create-reducer';
import { Equipment } from './models';
import { addItem, updateListItem, removeItem } from './utils';

export interface IEquipmentState {
    items: Equipment[];
    selected: Equipment;
}
const INITIAL_STATE: IEquipmentState = { items: [], selected: null };

export const equipmentReducer = createReducer(INITIAL_STATE, {
  [EquipmentActions.ADD_EQUIPMENT](state, action) {
      return Object.assign({}, state, { items: addItem(state.equipments, action.equipment)});
  },
  [EquipmentActions.REMOVE_EQUIPMENT](state, action) {
    return Object.assign({}, state, { items: removeItem(state.equipments, action.equipment)});
  },
  [EquipmentActions.UPDATE_EQUIPMENT](state, action) {
    return Object.assign({}, state, { items: updateListItem(state.equipments, action.equipment)});
  },
  [EquipmentActions.GET_ALL_EQUIPMENT](state, action) {
    return Object.assign({}, state, { items: action.items, selected: null});
  },
  [EquipmentActions.SELECT_EQUIPMENT](state, action) {
    return Object.assign({}, state, { selected: action.equipment});
  },
});
