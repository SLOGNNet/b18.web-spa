import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import {  ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../guards';
import { Location } from '@angular/common';

export abstract class BaseDetailComponent<T> implements CanComponentDeactivate {
  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;

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

  // CanComponentDeactivate inteface
  public canDeactivate() {
    if (this.isDetailsChanged()) {
      return confirm('There are unsaved changes that will discard once you leave?');
    }
    else {
      return true;
    }
  }

  protected abstract isDetailsChanged();

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
    this.location.back();
    // if (this.isNew) {
    //   this.isNew = false;
    //   this.selectedItem = null;
    // } else {
    //   this.selectedItem = cloneDeep(this.selectedItem);
    // }
  }
}
