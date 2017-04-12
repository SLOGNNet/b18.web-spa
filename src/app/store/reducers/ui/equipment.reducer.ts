import { EquipmentActions } from '../actions';
import { createReducer } from '../create-reducer';
import { Equipment } from '../models';

export interface IEquipmentState {
  list: string[];
  selected: string;
  isLoading: boolean;
}
const INITIAL_STATE: IEquipmentState = { list: [], selected: null, isLoading: false};

export const equipmentReducer = createReducer(INITIAL_STATE, {
  [EquipmentActions.ADD_EQUIPMENT_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: true
    });
  },
  [EquipmentActions.ADD_EQUIPMENT_SUCCESS](state, action) {
    return Object.assign({}, state, {
      list: [action.data.result, ...state.list],
      selected: action.prevId === state.selected ? action.data.result : state.selected,
      isLoading: false
    });
  },
  [EquipmentActions.UPDATE_EQUIPMENT_REQUEST](state, action) {
    return Object.assign({}, state,
      {
        isLoading: true
      });
  },
  [EquipmentActions.UPDATE_EQUIPMENT_SUCCESS](state, action) {
    return Object.assign({}, state,
      {
        isLoading: false
      });
  },
  [EquipmentActions.GET_ALL_EQUIPMENTS](state, action) {
    return Object.assign({}, state, { list: action.data.result });
  },
  [EquipmentActions.SELECT_EQUIPMENT](state, action) {
    return Object.assign({}, state, { selected: action.data.result, isLoading: false});
  },
});
