import { EquipmentActions } from './actions';
import { createReducer } from './create-reducer';
import { Equipment } from './models';
import { addItem, updateListItem, removeItem, updateItem, updateNewItem } from './utils';

export interface IEquipmentState {
    items: Equipment[];
    selected: Equipment;
    isLoading: boolean;
}
const INITIAL_STATE: IEquipmentState = { items: [], selected: null, isLoading: false };

export const equipmentReducer = createReducer(INITIAL_STATE, {
    [EquipmentActions.ADD_EQUIPMENT_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [EquipmentActions.ADD_EQUIPMENT_SUCCESS](state, action) {
    return Object.assign({}, state, {
      items: addItem(state.items, action.equipment, action.newId),
      selected: updateNewItem(state.selected, action.equipment, action.newId),
      isLoading: false
    });
  },
  [EquipmentActions.REMOVE_EQUIPMENT](state, action) {
    return Object.assign({}, state, { items: removeItem(state.items, action.equipment)});
  },
  [EquipmentActions.UPDATE_EQUIPMENT](state, action) {
    return Object.assign({}, state, {
      items: updateListItem(state.items, action.equipment),
      selected: updateItem(state.selected, action.equipment),
      isLoading: false
    });
  },
  [EquipmentActions.GET_ALL_EQUIPMENT](state, action) {
    return Object.assign({}, state, { items: action.items.slice(), isLoading: false});
  },
  [EquipmentActions.SELECT_EQUIPMENT](state, action) {
    return Object.assign({}, state, { selected: action.equipment, isLoading: false});
  },
});
