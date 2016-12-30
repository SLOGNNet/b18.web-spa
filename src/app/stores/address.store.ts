import { Injectable } from '@angular/core';
import { Address } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { chain } from 'lodash';

@Injectable()
export class AddressStore {

  private _addresses: BehaviorSubject<Array<Address>> = new BehaviorSubject(Array<Address>());

  set(addresses) {
    this._addresses.next(addresses);
  }

  public remove(removed: Address) {
    this._addresses.next(
      this._addresses
        .getValue()
        .filter(address => address.id !== removed.id)
      );
  }

  public add(added: Address) {
    this._addresses.next([...this._addresses.getValue(), added]);
  }

  public update(updated: Address) {
    const updateItems = this._addresses
      .getValue()
      .map(address => (address.id === updated.id ? Object.assign({}, updated) : address));
    this._addresses.next(updateItems);
  }

  get addresses(): Observable<Array<Address>> {
    return this._addresses;
  }
}
