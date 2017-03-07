import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep, merge } from 'lodash';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../guards';
import { Location } from '@angular/common';

export abstract class BaseDetailComponent<T> {
  protected selectedItem: T = null;

  constructor(private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    private route: ActivatedRoute,
    private location: Location) {
    selected$.subscribe(item => {
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    if (!isNaN(id)) {
      this.actions.select(id);
    }
  }
}
