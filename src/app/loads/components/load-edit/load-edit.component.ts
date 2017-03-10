import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Load } from '../../../models';
import { LoadActions } from '../../../actions';
import { BaseEditComponent } from '../../../base';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';
import { Location } from '@angular/common';
import { LoadFormComponent } from '../../../forms';

@Component({
  selector: 'load-edit',
  templateUrl: './load-edit.component.html'
})
export class LoadEditComponent extends BaseEditComponent<Load> {
  @ViewChild(LoadFormComponent) loadFormComponent: LoadFormComponent;
  private anchors = [{
    id: 'info',
    title: 'Info'
  },  {
    id: 'company',
    title: 'Company'
  },  {
    id: 'pickups',
    title: 'Pickups'
  }, {
    id: 'dropoffs',
    title: 'Dropoffs'
  }, {
    id: 'requirements',
    title: 'Requirements'
  }, {
    id: 'documents',
    title: 'Documents'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    loadActions: LoadActions,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(state => state.loads.selected),
        ngRedux.select(state => state.loads.isLoading), route, router, location);
  }

  isDetailsChanged() {
    return this.loadFormComponent && this.loadFormComponent.loadForm.dirty;
  }
}
