import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import {  ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export abstract class BaseDetailComponent<T> {
  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;

  constructor(private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    private route: ActivatedRoute) {
    selected$.subscribe(item => {
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    this.isNew = id === 0;
    if (this.isNew) {
      this.actions.createNew();
    }
    else if (!isNaN(id)) {
      this.actions.select(id);
    }
  }

  private onItemSave(item) {
    // temporary disable for demo

    // if (this.isNew) {
    //   this.isNew = false;
    //   this.store.add(item);
    // } else {
    //   this.store.update(item);
    // }
    // this.selectedItem = cloneDeep(item);
  }

  private onItemCancel() {
    if (this.isNew) {
      this.isNew = false;
      this.selectedItem = null;
    } else {
      this.selectedItem = cloneDeep(this.selectedItem);
    }
  }
}
