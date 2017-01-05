import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IListDataStore } from '../../stores';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import {  ActivatedRoute, Params } from '@angular/router';

export abstract class BaseDetailComponent<T> {
  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;

  constructor(private store: IListDataStore<T>,
    private route: ActivatedRoute) {
    store.selectedItem().subscribe(item => {
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    this.isNew = id === 0;
    if (!isNaN(id)) {
      this.store.select(id);
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
