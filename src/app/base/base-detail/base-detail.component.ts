import { ChangeDetectorRef } from '@angular/core';
import { IDetailDataActions } from '../../actions';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BasePane } from '../base';

export abstract class BaseDetailComponent<T> extends BasePane {
  protected selectedItem: T = null;

  constructor(
    private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    router: Router,
    route: ActivatedRoute,
    protected cdr: ChangeDetectorRef) {
    super(router, route);
    selected$.subscribe(item => {
      this.selectedItem = cloneDeep(item);
      this.cdr.markForCheck();
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  private onEdit() {
    this.navigateToEdit();
  }

  private navigateToEdit() {
    this.router.navigate(['./edit'],  {preserveQueryParams: true, relativeTo: this.route});
  }

  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    if (!isNaN(id) && id > 0) {
      this.actions.select(id);
    }
  }
}
