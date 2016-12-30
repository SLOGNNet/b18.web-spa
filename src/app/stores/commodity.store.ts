import { Injectable } from '@angular/core';
import { CustomerService } from '../shared';
import { Commodity, Stop } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { chain, flatMap } from 'lodash';

@Injectable()
export class CommodityStore {

  private _commodities: BehaviorSubject<Array<Commodity>> = new BehaviorSubject(Array<Commodity>());

  constructor(private customerService: CustomerService) {
  }

  set(pickups: Array<Stop>, dropoffs: Array<Stop>) {
    const commodities = chain(pickups)
      .concat(dropoffs)
      .flatMap(stop => stop.commodities)
      .uniqBy(commodity => commodity.id)
      .value();
    this._commodities.next(commodities);
  }

  public remove(removed: Commodity) {
    this._commodities.next(
      this._commodities
        .getValue()
        .filter(commodity => commodity.id !== removed.id)
      );
  }

  public add(added: Commodity) {
    this._commodities.next([...this._commodities.getValue(), added]);
  }

  public select(commodity: Commodity, stop: Stop) {
    commodity.dropoffId = stop.id;
    this.update(commodity);
  }
  public deselect(commodity: Commodity) {
    commodity.dropoffId = null;
    this.update(commodity);
  }

  public update(updated: Commodity) {
    const newCommodities = this._commodities
      .getValue()
      .map(commodity => (commodity.id === updated.id ? Object.assign({}, updated) : commodity));
    this._commodities.next(newCommodities);
  }

  get commodities(): Observable<Array<Commodity>>  {
    return this._commodities;
  }

  getPickupCommodities(pickupId: number): Observable<Array<Commodity>> {
    return this.commodities.map(list => list.filter(c => c.pickupId === pickupId));
  }

  getDropoffCommodities(dropoffId: number): Observable<Array<Commodity>> {
    return this.commodities.map(list => list.filter(c => c.dropoffId === dropoffId));
  }

  getAvailableCommodities(): Observable<Array<Commodity>> {
    return this.commodities.map(list => list.filter(c => !c.dropoffId));
  }
}
