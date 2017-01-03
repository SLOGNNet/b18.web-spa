import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IListDataStore } from '../../stores';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import {  ActivatedRoute, Router, Params } from '@angular/router';

export abstract class BaseListDetailComponent<T> {
  @ViewChild('datatable') datatable;

  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;
  protected items: T[] = new Array<T>();

  constructor(private store: IListDataStore<T>,
    private route: ActivatedRoute,
    private router: Router) {
    store.getAll();
    store.items().subscribe((items) => {
      this.items = items;
    });
    store.selectedItem().subscribe(item => {
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  protected onAdd() {
    this.router.navigate([this.itemRoute(), 0]);
  }

  protected abstract itemRoute(): string;

  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    this.isNew = id === 0;
    if (!isNaN(id)) {
      this.store.select(id);
    }
  }

  private onSelect(event: any) {
    const item: T = event.selected[0];
    this.router.navigate([this.itemRoute(), item['id']]);
  }

  private onItemSave(item) {
    if (this.isNew) {
      this.isNew = false;
      this.store.add(item);
    } else {
      this.store.update(item);
    }
    this.selectedItem = cloneDeep(item);
  }

  private onItemCancel() {
    if (this.isNew) {
      this.isNew = false;
      this.selectedItem = null;
    } else {
      this.selectedItem = cloneDeep(this.selectedItem);
    }
  }

  private deselectRow() {
    this.datatable.selected = [];
  }
}
