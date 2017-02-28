import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { BdPerfectScrollbarComponent } from './common/bd-perfect-scrollbar/bd-perfect-scrollbar.component';
import { FilterContainer } from './components/filter-container/filter-container.component';
import { Load } from '../models';
import { LoadActions } from '../actions';
import { LoadService, CompanyService } from '../shared';
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
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent extends BaseListComponent<Load>{
  private isFilterActive = false;
  private scrolledDown = false;

  constructor(private loadService: LoadService,
    private companyService: CompanyService,
    loadActions: LoadActions,
    router: Router,
    route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>) {
    super(loadActions, ngRedux.select(state => state.loads.items), router, route);
    this.autocompleteSearchSource = this.autocompleteSearchSource.bind(this);
  }

  autocompleteSearchSource(query: string, page: number, count: number) {
    return this.companyService.getPaginatedSearch(query, page, count);
  }

  onFilterVisibilityChange(isVisible) {
    this.isFilterActive = isVisible;
  }

  onScrolledUp() {
    this.scrolledDown = false;
  }

  onScrolledDown() {
    this.scrolledDown = true;
  }

  protected routePath(): string {
    return 'loads/';
  }
}
