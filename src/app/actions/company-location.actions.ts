import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Company, Location, locationSchema } from '../models';
import { LocationService, CompanyService, NotificationService } from '../shared';
import { IDetailDataActions, INestedEditDataActions } from './intefaces';
import { CompanyActions } from './company.actions';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class CompanyLocationActions implements IDetailDataActions<Location>, INestedEditDataActions<Location, Company> {
  static ADD_LOCATION_CONTACT_REQUEST: string = 'ADD_LOCATION_CONTACT_REQUEST';
  static ADD_LOCATION_CONTACT_SUCCESS: string = 'ADD_LOCATION_CONTACT_SUCCESS';
  static UPDATE_LOCATION_CONTACT_REQUEST: string = 'UPDATE_LOCATION_CONTACT_REQUEST';
  static UPDATE_LOCATION_CONTACT_SUCCESS: string = 'UPDATE_LOCATION_CONTACT_SUCCESS';
  static UPDATE_LOCATION_CONTACT_FAILURE: string = 'UPDATE_LOCATION_CONTACT_FAILURE';
  static SELECT_LOCATION_CONTACT: string = 'SELECT_LOCATION_CONTACT';
  constructor(
    private locationService: LocationService,
    private companyActions: CompanyActions,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  addAssociation(location: Location, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyLocationActions.ADD_LOCATION_CONTACT_REQUEST });
    this.locationService.create(company, location).subscribe(newId => {
      const prevId = location.id;
      debugger;
      const normalizedData = normalize(createPeristEnity(location, newId), locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.ADD_LOCATION_CONTACT_SUCCESS, data: normalizedData, prevId, companyId: company.id});
      this.notificatonService.sendNotification('Location created.', `Location was created.`);
    });
  }

  updateAssociation(location: Location, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyLocationActions.UPDATE_LOCATION_CONTACT_REQUEST, location });

    setTimeout(() => {
      this.locationService.update(location);
      const normalizedData = normalize(location, locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.UPDATE_LOCATION_CONTACT_SUCCESS, data: normalizedData });
      this.notificatonService.sendNotification('Location updated.', `Location was updated.`);
    }, 3000);
  }

  select(locationId: string): void {
    this.locationService.getDetails(locationId).subscribe(contact => {
      const normalizedData = normalize(contact, locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.SELECT_LOCATION_CONTACT, data: normalizedData  });
    });
  }

  createNew(): void {
    const normalizedData = normalize(Location.create(), locationSchema);
    debugger;
    this.ngRedux.dispatch({ type: CompanyLocationActions.SELECT_LOCATION_CONTACT, data: normalizedData  });
  }
}
