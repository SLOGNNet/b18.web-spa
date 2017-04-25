import { ChangeDetectorRef, HostBinding } from '@angular/core';
import { IDetailDataActions } from '../../actions';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BasePane } from '../base';

export abstract class BaseDetailComponent<T> extends BasePane {
  @HostBinding('class.interactive-panel') v: boolean = true;
  protected selectedItem: T = null;

  constructor(
    private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    router: Router,
    route: ActivatedRoute,
    protected cdr: ChangeDetectorRef) {
    super(router, route);
    this.subscribers.push(selected$.subscribe(item => {
      this.selectedItem = cloneDeep(item);
      this.cdr.markForCheck();
    }));
    this.subscribers.push(this.route.params.subscribe(params => {
      this.onQueryParams(params);
    }));
  }

  protected onEdit() {
    this.navigateToEdit();
  }

  private navigateToEdit() {
    this.router.navigate(['./edit'],  {preserveQueryParams: true, relativeTo: this.route});
  }

  private onQueryParams(params) {
    const id = params['id'];
    if (id && id !== '0') {
      this.actions.select(id);
    }
  }
}
