import { INestedEditDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from './base-edit.component';

export abstract class BaseNestedEditComponent<T, Y> extends BaseEditComponent<T> {
  protected segment;
  protected parentItem: Y = null;

  constructor(protected actions: INestedEditDataActions<T, Y>,
    parent$: Observable<Y>,
    selected$: Observable<T>,
    isLoading$: Observable<boolean>,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    cdr: ChangeDetectorRef) {
    super(selected$, isLoading$, route, router, location, cdr);
    parent$.subscribe(item => {
      this.parentItem = cloneDeep(item);
      this.cdr.markForCheck();
    });
  }

  protected abstract getItemName();

  protected onAdd(item: T) {
    this.actions.addAssociation(item, this.parentItem);
  }

  protected onUpdate(item: T) {
    this.actions.updateAssociation(item, this.parentItem);
  }

  protected onCreatNew() {
    this.actions.createNew();
  }

  protected onSelect(id: string) {
    this.actions.select(id);
  }
}
