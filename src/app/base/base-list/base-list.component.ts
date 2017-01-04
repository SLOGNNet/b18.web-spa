import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IListDataStore } from '../../stores';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { Router, Params } from '@angular/router';

export abstract class BaseListComponent<T> {
  @ViewChild('datatable') datatable;

  protected items: T[] = new Array<T>();

  constructor(private store: IListDataStore<T>,
    private router: Router) {
    store.getAll();
    store.items().subscribe((items) => {
      this.items = items;
    });
  }

  protected onAdd() {
    this.deselectRow();
    this.router.navigate([this.itemRoute(), 0]);
  }

  protected abstract itemRoute(): string;

  private onSelect(event: any) {
    const item: T = event.selected[0];
    this.router.navigate([this.itemRoute(), item['id']]);
  }

  private deselectRow() {
    this.datatable.selected = [];
  }
}
