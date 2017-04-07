import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { driverSchema, driverListSchema, Driver } from '../../models';

export const selectDrivers = (state: IAppState): Driver[] => {
  const result =  denormalize(state.ui.drivers.list,
  driverListSchema,
  state.entities);
  return result;
};

export const selectDriver = (state: IAppState, id: string): Driver => denormalize(id,
  driverSchema,
  state.entities);

export const selectDetailDriver = (state: IAppState): Driver => {
  return selectDriver(state, state.ui.drivers.selected);
};
