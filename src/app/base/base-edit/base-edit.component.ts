import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../guards';
import { Location } from '@angular/common';
import { BasePane } from '../base';

export abstract class BaseEditComponent<T> extends BasePane implements CanComponentDeactivate {
  protected isLoading = false;
  protected isNew = false;
  protected selectedItem: T = null;
  protected viewMode: ViewMode = ViewMode.Edit;

  constructor(private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    protected isLoading$: Observable<boolean>,
    route: ActivatedRoute,
    router: Router,
    private location: Location) {
    super(router, route);
    isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    selected$.subscribe(item => {
      this.redirectIfNewCreated(this.selectedItem, item);
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.checkNewItem();
    });
     this.checkNewItem();
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

  redirectIfNewCreated(prevSelected, newSelected) {
    if (newSelected && prevSelected
     && !prevSelected['prevId']
     && newSelected['prevId']
     && prevSelected['id'] === newSelected['prevId']) {
      const newId = newSelected['id'];
      super.rediretToId(newId);
    }
  }

  private checkNewItem() {
    const snapshot = this.route.snapshot;
    const paramId = Number.parseInt(snapshot.params['id']);
    this.isNew = paramId === 0 || this.route.snapshot.data['new'];
    if (this.isNew) {
      this.actions.createNew();
    }
  }

  private onItemSave(item) {
    const changedItem = cloneDeep(item);
    if (this.isNew) {
      this.isNew = false;
      this.actions.add(changedItem);
    } else {
      this.actions.update(changedItem);
    }
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
