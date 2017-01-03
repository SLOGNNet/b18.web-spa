import { Injectable } from '@angular/core';
import { Load } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { chain } from 'lodash';
import { LoadService } from '../shared';
import { IListDataStore } from './interfaces';

@Injectable()
export class LoadStore implements IListDataStore<Load> {
  private _loads: BehaviorSubject<Array<Load>> = new BehaviorSubject(Array<Load>());
  private _selectedLoad: BehaviorSubject<Load> = new BehaviorSubject(null);

  constructor(private loadService: LoadService) {
  }

  items(): Observable<Array<Load>> {
    return this._loads.asObservable();
  }

  selectedItem(): Observable<Load> {
    return this._selectedLoad.asObservable();
  }

  getAll() {
    this.loadService.getAll().subscribe(loads => {
        this._loads.next(loads);
    });
  }

  public select(id: number) {
    if (id === 0) {
        this._selectedLoad.next(Load.create());
    }
    else {
      this._loads
        .flatMap(loads => loads)
        .filter(load => load.id === id)
        .defaultIfEmpty(null)
        .subscribe(load => {
          this._selectedLoad.next(load);
        });
    }
  }

  public remove(removed: Load) {
    this._loads.next(
      this._loads
        .getValue()
        .filter(load => load.id !== removed.id)
      );
  }

  public add(added: Load) {
    this.loadService.create(added);
    this._loads.next([...this._loads.getValue(), added]);
  }

  public update(updated: Load) {
    this.loadService.update(updated);
    const updateItems = this._loads
      .getValue()
      .map(load => (load.id === updated.id ? Object.assign({}, updated) : load));
    this._loads.next(updateItems);
  }
}
