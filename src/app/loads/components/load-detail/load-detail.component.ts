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

  private stopMode: string = 'load';
  onStopModeChange(mode: string) {
    this.stopMode = mode;
  }
  onStopRemove(stop: Stop) {

  }

  onStopEdit(stop: Stop) {
    const id = stop ? stop.id : 0;
    this.router.navigate(['edit-stop', id], { preserveQueryParams: true, relativeTo: this.route });
  }

  private trackBy(index: number, stop: Stop) {
    return stop.id;
  }

  onLoadEditClick() {
    this.router.navigate(['edit-info'], { preserveQueryParams: true, relativeTo: this.route });
  }
}
