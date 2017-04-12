import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { stopSchema, Stop } from '../../models';

export const selectStop = (state: IAppState, id: string): Stop => denormalize(id,
  stopSchema,
  state.entities);

export const selectDetailStop = (state: IAppState): Stop => {
  return selectStop(state, state.ui.stops.selected);
};
