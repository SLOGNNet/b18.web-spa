import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Company } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyActions } from '../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailCompany } from '../../../store';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent extends BaseDetailComponent<Company> {

  private anchors = [{
    id: 'basic-information',
    title: 'Basic Information'
  }, {
      id: 'address',
      title: 'Address'
    }, {
      id: 'contacts',
      title: 'Contacts'
    }];

  constructor(
    cdr: ChangeDetectorRef,
    companyActions: CompanyActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
    super(companyActions, ngRedux.select(selectDetailCompany),
      router, route, cdr);
  }

  onEditInfoClick() {
    this.router.navigate(['./edit-info'],  {preserveQueryParams: true, relativeTo: this.route});
  }

  onAddContactClick(contact) {
    this.router.navigate([`./edit-contact/0`],  {preserveQueryParams: true, relativeTo: this.route});
  }

  onAddLocationClick(contact) {
    this.router.navigate([`./edit-location/0`],  {preserveQueryParams: true, relativeTo: this.route});
  }
}
