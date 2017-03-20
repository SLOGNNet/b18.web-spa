import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Load } from '../models';
import { IListDataActions, IDetailDataActions } from './intefaces';
import { LoadService } from '../shared';

@Injectable()
export class LoadActions implements IListDataActions<Load>, IDetailDataActions<Load> {
  static ADD_LOAD_REQUEST: string = 'ADD_LOAD_REQUEST';
  static ADD_LOAD_SUCCESS: string = 'ADD_LOAD_SUCCESS';
  static ADD_LOAD_FAILURE: string = 'ADD_LOAD_FAILURE';
  static REMOVE_LOAD: string = 'REMOVE_LOAD';
  static UPDATE_LOAD_REQUEST: string = 'UPDATE_LOAD_REQUEST';
  static UPDATE_LOAD_SUCCESS: string = 'UPDATE_LOAD_SUCCESS';
  static UPDATE_LOAD_FAILURE: string = 'UPDATE_LOAD_FAILURE';
  static SELECT_LOAD: string = 'SELECT_LOAD';
  static CREATE_NEW_LOAD: string = 'CRETE_NEW_LOAD';
  static GET_ALL_LOADS: string = 'GET_ALL_LOADS';

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private loadService: LoadService) {}

  add(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.ADD_LOAD_REQUEST, load });
  }

  remove(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.REMOVE_LOAD, load  });
  }

  update(load: Load): void {
    this.ngRedux.dispatch({ type: LoadActions.UPDATE_LOAD_REQUEST, load });
  }

  select(loadId: string): void {
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
