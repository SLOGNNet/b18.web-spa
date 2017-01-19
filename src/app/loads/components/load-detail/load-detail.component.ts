import { Component } from '@angular/core';
import { Load } from '../../../models';
import { LoadActions } from '../../../actions';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Params } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';

@Component({
  selector: 'load-detail',
  templateUrl: './load-detail.component.html'
})
export class LoadDetailComponent extends BaseDetailComponent<Load> {
  private anchors = [{
    id: 'info',
    title: 'Info'
  },  {
    id: 'customer',
    title: 'Customer'
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
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }];

  constructor(
    loadActions: LoadActions,
    route: ActivatedRoute,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(state => state.loads.selected), route);
  }
}
