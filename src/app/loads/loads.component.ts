import { Component, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadStore } from '../stores';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import {  ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListDetailComponent } from '../base';

@Component({
  selector: 'loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
  providers: [LoadStore]
})
export class LoadsComponent extends BaseListDetailComponent<Load>{
  columns = [
    { prop: 'id', name: 'Load #' },
    { prop: 'customer.name', name: 'Customer' },
    { prop: 'status', name: 'Status' }
  ];
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

  constructor(loadStore: LoadStore,
    route: ActivatedRoute,
    router: Router) {
    super(loadStore, route, router);
  }

  protected itemRoute(): string {
    return 'loads/';
  }
}
