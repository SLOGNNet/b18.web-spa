import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Load, Stop, ContactInfo, TripStop, Address, StopActionTypes, Contact } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadActions } from '../../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { BdViewDetailComponent } from './common/bd-view-detail';
import { CommoditiesHeaderComponent } from '../../../forms';
import MockData from '../../../shared/services/data-services/mock-data';


@Component({
  selector: 'load-detail',
  templateUrl: './load-detail.component.html',
  styleUrls: ['./load-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDetailComponent extends BaseDetailComponent<Load> {

  private selectedContact: Contact;
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
      this.selectedContact = Load.getSelectedContact(this.selectedItem.customer.contacts, this.selectedItem.contactId);
  }

}
