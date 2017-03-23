import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Load } from '../../../models';
import { LoadActions } from '../../../actions';
import { BaseRootEditComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';
import { Location } from '@angular/common';
import { LoadFormComponent } from '../../../forms';

@Component({
  selector: 'load-edit',
  templateUrl: './load-edit.component.html'
})
export class LoadEditComponent extends BaseRootEditComponent<Load> {
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
    cdr: ChangeDetectorRef,
    loadActions: LoadActions,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(state => state.loads.selected),
        ngRedux.select(state => state.loads.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.loadFormComponent && this.loadFormComponent.loadForm.dirty;
  }
}
