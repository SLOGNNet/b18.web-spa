import { IRootEditDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from './base-edit.component';

export abstract class BaseRootEditComponent<T> extends BaseEditComponent<T> {
  protected segment;

  constructor(protected actions: IRootEditDataActions<T>,
    selected$: Observable<T>,
    isLoading$: Observable<boolean>,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    cdr: ChangeDetectorRef) {
    super(selected$, isLoading$, route, router, location, cdr);
  }

  protected onAdd(item: T) {
    this.actions.add(item);
  }

  protected onUpdate(item: T) {
    this.actions.update(item);
  }

  protected onCreatNew() {
    this.actions.createNew();
  }

  protected onSelect(id: string) {
    this.actions.select(id);
  }

  get actionName() {
    return this.isNew ? 'New ' + this.getItemName() : this.getItemName();
  }
}
