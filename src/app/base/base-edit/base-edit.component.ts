import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../guards';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { BasePane } from '../base';

export abstract class BaseEditComponent<T> extends BasePane implements CanComponentDeactivate {
  protected isLoading = false;
  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;
  protected segment;
  protected navigationTitle;

  constructor(protected selected$: Observable<T>,
    protected isLoading$: Observable<boolean>,
    route: ActivatedRoute,
    router: Router,
    private location: Location,
    protected cdr: ChangeDetectorRef) {
    super(router, route);
    isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    selected$.subscribe(item => {
      this.redirectIfNewCreated(this.selectedItem, item);
      this.selectedItem = cloneDeep(item);
      this.cdr.markForCheck();
    });

    // http://weblogs.foxite.com/joel_leach/2016/11/18/setting-subclass-properties-in-typescript/
    setTimeout( () => {
      this.route.params.subscribe(params => {
        this.checkNewItem();
      });
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
  protected abstract onAdd(item: T);
  protected abstract onUpdate(item: T);
  protected abstract onCreatNew();
  protected abstract onSelect(id: string)


  protected onItemSave(item) {
    const changedItem = cloneDeep(item);
    if (this.isNew) {
      this.isNew = false;
      this.onAdd(item);
    } else {
      this.onUpdate(item);
    }
  }

  protected onItemCancel() {
    this.location.back();
    // if (this.isNew) {
    //   this.isNew = false;
    //   this.selectedItem = null;
    // } else {
    //   this.selectedItem = cloneDeep(this.selectedItem);
    // }
  }

  redirectIfNewCreated(prevSelected, newSelected) {
    if (newSelected && prevSelected
     && !prevSelected['prevId']
     && newSelected['prevId']
     && prevSelected['id'] === newSelected['prevId']) {
      const newId = newSelected['id'];
      super.redirectToId(newId, this.segment);
    }
  }

  private checkNewItem() {
    const snapshot = this.route.snapshot;
    const paramId = snapshot.params['id'];
    this.isNew = paramId === '0' || this.route.snapshot.data['new'];
    if (this.isNew) {
      this.onCreatNew();
    } else {
      this.onSelect(paramId);
    }
  }

}
