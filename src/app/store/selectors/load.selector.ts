import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { loadSchema, loadListSchema, Load } from '../../models';

export const selectLoads = (state: IAppState): Load[] => {
  const result =  denormalize(state.ui.loads.list,
  loadListSchema,
  state.entities);
  return result;
};

export const selectLoad = (state: IAppState, id: string): Load => denormalize(id,
  loadSchema,
  state.entities);

export const selectDetailLoad = (state: IAppState): Load => {
  return selectLoad(state, state.ui.loads.selected);
};
