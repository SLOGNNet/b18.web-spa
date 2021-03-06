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
  static REMOVE_LOCATION_CONTACT_SUCCESS: string = 'REMOVE_LOCATION_CONTACT_SUCCESS';
  static SELECT_LOCATION_CONTACT: string = 'SELECT_LOCATION_CONTACT';
  constructor(
    private locationService: LocationService,
    private companyActions: CompanyActions,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  addAssociation(location: Location, company: Company): void {
    const normalizedPhantomData = normalize(location, locationSchema);
    this.ngRedux.dispatch({ type: CompanyLocationActions.ADD_LOCATION_CONTACT_REQUEST, data: normalizedPhantomData });

    this.locationService.create(company, location).subscribe(newId => {
      const prevId = location.id;
      const normalizedData = normalize(createPeristEnity(location, newId), locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.ADD_LOCATION_CONTACT_SUCCESS, data: normalizedData, prevId, companyId: company.id });
      this.notificatonService.sendNotification('Location created.', `Location was created.`);
    });
  }

  updateAssociation(location: Location, company: Company): void {
    const normalizedData = normalize(location, locationSchema);
    this.ngRedux.dispatch({ type: CompanyLocationActions.UPDATE_LOCATION_CONTACT_REQUEST, data: normalizedData });

    setTimeout(() => {
      this.locationService.update(location);
      this.ngRedux.dispatch({ type: CompanyLocationActions.UPDATE_LOCATION_CONTACT_SUCCESS, data: normalizedData });
      this.notificatonService.sendNotification('Location updated.', `Location was updated.`);
    }, 3000);
  }

  removeAssociation(location: Location, company: Company): void {
    this.locationService.remove(company, location).subscribe(_ => {
      const normalizedData = normalize(location, locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.REMOVE_LOCATION_CONTACT_SUCCESS, data: normalizedData, companyId: company.id });
    });
  }

  select(locationId: string): void {
    this.locationService.getDetails(locationId).subscribe(contact => {
      const normalizedData = normalize(contact, locationSchema);
      this.ngRedux.dispatch({ type: CompanyLocationActions.SELECT_LOCATION_CONTACT, data: normalizedData });
    }, (error) => { });
  }

  createNew(): void {
    const normalizedData = normalize(Location.create(), locationSchema);
    this.ngRedux.dispatch({ type: CompanyLocationActions.SELECT_LOCATION_CONTACT, data: normalizedData });
  }
}
