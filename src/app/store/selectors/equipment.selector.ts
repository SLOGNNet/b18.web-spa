import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { equipmentSchema, equipmentListSchema, Equipment } from '../../models';

export const selectEquipments = (state: IAppState): Equipment[] => {
  const result =  denormalize(state.ui.equipments.list,
  equipmentListSchema,
  state.entities);
  return result;
};

export const selectEquipment = (state: IAppState, id: string): Equipment => denormalize(id,
  equipmentSchema,
  state.entities);

export const selectDetailEquipment = (state: IAppState): Equipment => {
  return selectEquipment(state, state.ui.equipments.selected);
};
