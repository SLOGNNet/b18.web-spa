import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { selectDetailStop } from './stop.selector';
import { loadSchema, loadListSchema, Load, Commodity, Stop, StopActionTypes, StopAction } from '../../models';
import { differenceWith } from 'lodash';
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
  const res =  selectLoad(state, state.ui.loads.selected);
  return res;
};

export const selectAvailableCommodities = (state: IAppState): Array<Commodity> => {
  const selectedLoad = selectDetailLoad(state);
  const seletedStop = selectDetailStop(state);
  const allCommodities: Array<any> = selectedLoad.commodities;
  const selectedCommodities = [...selectedLoad.stops, seletedStop]
    .map(s => s.stopActions)
    .reduce((pre, cur) => pre.concat(cur), [])
    .filter((sa: StopAction) => sa.type === StopActionTypes.DROPOFF)
    .map(sa => sa.commodities)
    .reduce((pre, cur) => pre.concat(cur), []);
  const availableCommodities = differenceWith(allCommodities, selectedCommodities, (a, b) => a.id === b.id);
  return availableCommodities;
};


