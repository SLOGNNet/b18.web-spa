import { Component } from '@angular/core';
import { Load } from '../../../models';
import { LoadStore } from '../../../stores';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Params } from '@angular/router';

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
  }, {
    id: '',
    title: 'Link'
  }];

  constructor(
    loadStore: LoadStore,
    route: ActivatedRoute) {
      super(loadStore, route);
  }
}
