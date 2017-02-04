import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadActions } from '../actions';
import { LoadService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';

@Component({
  selector: 'loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadsComponent extends BaseListComponent<Load>{

  constructor(private loadService: LoadService,
    loadActions: LoadActions,
    router: Router,
    route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>,
    cdr: ChangeDetectorRef) {
    super(loadActions, ngRedux.select(state => state.loads.items), router, route, cdr);
  }

  protected routePath(): string {
    return 'loads/';
  }
}
