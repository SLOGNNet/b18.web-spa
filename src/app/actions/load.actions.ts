import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Load } from '../models';
import { IListDataActions, IDetailDataActions } from './intefaces';
import { LoadService } from '../shared';

@Injectable()
export class LoadActions implements IListDataActions<Load>, IDetailDataActions<Load> {
  static ADD_LOAD: string = 'ADD_LOAD';
  static REMOVE_LOAD: string = 'REMOVE_LOAD';
  static UPDATE_LOAD: string = 'UPDATE_LOAD';
  static SELECT_LOAD: string = 'SELECT_LOAD';
  static CREATE_NEW_LOAD: string = 'CRETE_NEW_LOAD';
  static GET_ALL_LOADS: string = 'GET_ALL_LOADS';

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private loadService: LoadService) {}

  add(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.ADD_LOAD, load });
  }

  remove(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.REMOVE_LOAD, load  });
  }

  update(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.UPDATE_LOAD, load });
  }

  select(loadId: number): void {
    this.loadService.getDetails(loadId).subscribe(load => {
      this.ngRedux.dispatch({ type: LoadActions.SELECT_LOAD, load });
    });
  }

  createNew(): void {
    this.ngRedux.dispatch({ type: LoadActions.SELECT_LOAD, load: Load.create() });
  }

  getAll(): void {
    this.loadService.getAll().subscribe(loads => {
      this.ngRedux.dispatch({ type: LoadActions.GET_ALL_LOADS, items: loads });
    });
  }
}
