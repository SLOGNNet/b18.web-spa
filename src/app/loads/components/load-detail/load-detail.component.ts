import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Load, Stop, Contact } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadActions } from '../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailLoad } from '../../../store';

@Component({
  selector: 'load-detail',
  templateUrl: './load-detail.component.html',
  styleUrls: ['./load-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDetailComponent extends BaseDetailComponent<Load> {
  private anchors = [{
    id: 'load-view',
    title: 'Load'
  }, {
    id: 'requirements-view',
    title: 'Requirements'
  }, {
    id: 'customer-view',
    title: 'Customer'
  }, {
    id: 'itinerary-view',
    title: 'Itinerary'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    loadActions: LoadActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(selectDetailLoad), router, route, cdr);
  }

  get selectedContact(): Contact {
    return Load.getSelectedContact(this.selectedItem.customer.contacts, this.selectedItem.contactId);
  };

  onStopRemove(stop: Stop) {

  }

  onStopEdit(stop: Stop) {
    this.router.navigate(['edit-stop', stop.id], { preserveQueryParams: true, relativeTo: this.route });
  }

  onLoadEditClick() {
    this.router.navigate(['edit-info'], { preserveQueryParams: true, relativeTo: this.route });
  }
}
