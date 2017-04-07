import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { locationSchema, Location } from '../../models';

export const selectLocation = (state: IAppState, id: string): Location => denormalize(id,
  locationSchema,
  state.entities);

export const selectDetailLocation = (state: IAppState): Location => {
  debugger;
  const res = selectLocation(state, state.ui.locations.selected);
  return res;
};
