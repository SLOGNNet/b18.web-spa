import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Load, Contact } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadActions } from '../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';


@Component({
  selector: 'load-detail',
  templateUrl: './load-detail.component.html',
  styleUrls: ['./load-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDetailComponent extends BaseDetailComponent<Load> {
  private anchors = [{
    id: 'customer',
    title: 'Customer'
  },  {
    id: 'requirements',
    title: 'Requirements'
  },  {
    id: 'itinerary',
    title: 'Itinerary'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    loadActions: LoadActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(state => state.loads.selected), router, route);
  }

    get selectedContact(): Contact {
      return Load.getSelectedContact(this.selectedItem.customer.contacts, this.selectedItem.contactId);
    };

}
