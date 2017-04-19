import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Commodity, StopAction, Load, commoditySchema, stopSchema } from '../models';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class CommodityActions {
  static ADD_COMMODITY: string = 'ADD_COMMODITY';
  static REMOVE_COMMODITY: string = 'REMOVE_COMMODITY';
  static UPDATE_COMMODITY: string = 'UPDATE_COMMODITY';
  static SELECT_COMMODITY: string = 'SELECT_COMMODITY';
  static DESELECT_COMMODITY: string = 'DESELECT_COMMODITY';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(commodity: Commodity, stopAction: StopAction, load: Load): void {
    const normalizedData = normalize(commodity, commoditySchema);
    this.ngRedux.dispatch({ type: CommodityActions.ADD_COMMODITY, data: normalizedData, loadId: load.id, stopActionId: stopAction.id });
  }

  remove(commodity: Commodity): void {
    this.ngRedux.dispatch({ type: CommodityActions.REMOVE_COMMODITY, commodity });
  }

  update(commodity: Commodity): void {
    const normalizedData = normalize(commodity, commoditySchema);
    this.ngRedux.dispatch({ type: CommodityActions.UPDATE_COMMODITY, data: normalizedData });
  }

  select(commodity: Commodity, stopAction: StopAction): void {
    const normalizedCommodity = normalize(commodity, commoditySchema);
    this.ngRedux.dispatch({ type: CommodityActions.SELECT_COMMODITY, data: normalizedCommodity});
  }

  deselect(commodity: Commodity): void {
    const normalizedData = normalize(commodity, commoditySchema);
    this.ngRedux.dispatch({ type: CommodityActions.DESELECT_COMMODITY, data: normalizedData });
  }
}
