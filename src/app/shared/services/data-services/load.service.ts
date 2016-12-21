import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Load, Customer, LoadStatuses, DriverRequirments, PowerUnitTypes, TrailerTypes, Stop, Commodity } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import { CustomerService } from  './index';

@Injectable()
export class LoadService {

  private _commodities: Array<Commodity> = [{
    pickupNumber: 1,
    po: '23324234',
    commodity: 'Strawberry',
    unitType: 'Boxes',
    unitCount: 22,
    palletCount: 10,
    weight: 14,
  },
  {
    pickupNumber: 2,
    po: '789',
    commodity: 'Toma',
    unitType: 'Boxes',
    unitCount: 10,
    palletCount: 10,
    weight: 5
  }];

  private _loadsData: Array<Load> = [
    {
      id: 1,
      customerId: 1,
      customer: null,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.Reefer,
      specialRequirment: 'specialRequirments1',
      stops: [{
        commodities: this._commodities
      }]
    },
    { id: 2,
      customerId: 2,
      customer: null,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Tractor,
      trailerType: TrailerTypes.Other,
      specialRequirment: 'specialRequirments2',
      stops: [{
        commodities: this._commodities
      }]
    },
    { id: 3,
      customerId: 3,
      customer: null,
      status: LoadStatuses.Booked,
      driverRequirment: DriverRequirments.Solo,
      powerUnitType: PowerUnitTypes.Other,
      trailerType: TrailerTypes.Reefer,
      specialRequirment: 'specialRequirments3',
      stops: [{
        commodities: this._commodities
      }]
    },
  ];

  constructor(private http: Http, private customerService: CustomerService) {

  }

  getAll(): Observable<Load[]> {
    return Observable.from(this._loadsData)
      .flatMap(
        (load) => this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
    ).toArray();
  }

  getDetails(loadId: number): Observable<Load> {
    return Observable.of(this._loadsData.find((load) => load.id === loadId))
      .flatMap((load) =>
        this.customerService
          .get(load.id)
          .map(customer => Object.assign(load, { customer: customer }))
      );
  };
}
