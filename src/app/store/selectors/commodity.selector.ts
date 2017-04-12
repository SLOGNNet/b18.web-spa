import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { commodityListSchema, Commodity, Load } from '../../models';


export const selectedLoadAvailableCommodities = (state: IAppState): Commodity[] => {
  const selectedLoad: Load = state.entities.loads[state.ui.loads.selected];
  const result =  denormalize(selectedLoad.commodities,
    commodityListSchema,
    state.entities);
  return result;
};
