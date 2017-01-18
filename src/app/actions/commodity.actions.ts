import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Commodity, Stop } from '../models';

@Injectable()
export class CommodityActions {
  static ADD_COMMODITY: string = 'ADD_COMMODITY';
  static REMOVE_COMMODITY: string = 'REMOVE_COMMODITY';
  static UPDATE_COMMODITY: string = 'UPDATE_COUNTER';
  static SELECT_COMMODITY: string = 'SELECT_COMMODITY';
  static DESELECT_COMMODITY: string = 'DESELECT_COMMODITY';

  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  add(commodity: Commodity): void {
    this.ngRedux.dispatch({ type: CommodityActions.ADD_COMMODITY, commodity });
  }

  remove(commodity: Commodity): void {
    this.ngRedux.dispatch({ type: CommodityActions.REMOVE_COMMODITY, commodity });
  }

  update(commodity: Commodity): void {
    this.ngRedux.dispatch({ type: CommodityActions.UPDATE_COMMODITY, commodity });
  }

  select(commodity: Commodity, stop: Stop): void {
    this.ngRedux.dispatch({ type: CommodityActions.SELECT_COMMODITY, commodity, stop });
  }

  deselect(commodity: Commodity): void {
    this.ngRedux.dispatch({ type: CommodityActions.DESELECT_COMMODITY, commodity });
  }
}
