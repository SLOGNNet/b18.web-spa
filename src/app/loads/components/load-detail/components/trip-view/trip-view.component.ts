import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, StopActionTypes, StopAction } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { BdContactInfoComponent } from './common/bd-icons/bd-contact-info';
import { CommoditiesHeaderComponent } from '../../../../../forms/commodities-forms';
import { find, map, filter } from 'lodash';

@Component({
  selector: 'trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripViewComponent {
  @Input() tripData: TripStop;
  @Input() isExpanded: boolean;

  public pickupCommodities: Array<StopAction> = [];
  public dropoffCommodities: Array<StopAction> = [];
  public appointmentType: string = '';
  public phoneNumber: string = '';

  get hasPickupCommodities() { return this.pickupCommodities.length > 0; }

  get hasDropoffCommodities() { return this.dropoffCommodities.length > 0; }

  public commodityHeaders = [
      { name: 'NUMBER' },
      { name: 'P.O.' },
      { name: 'COMMO-<br />DITY' },
      { name: 'UNIT<br />TYPE' },
      { name: 'UNIT<br />COUNT' },
      { name: 'PALLET<br />COUNT' },
      { name: 'WEIGHT<br />(IBS)' }
    ];

  ngOnInit() {
    this.appointmentType = this.getAppointmentType(this.tripData.appointment.type);
    this.phoneNumber = find(this.tripData.facility.contactInfo, item => item.label === 'Primary Phone').value;

    this.pickupCommodities = filter(this.tripData.stopActions, item => item.type === StopActionTypes.Pickup);
    this.dropoffCommodities = filter(this.tripData.stopActions, item => item.type === StopActionTypes.Dropoff);
  }

  getAppointmentType(type: AppointmentTypes) {
    return Appointment.getAppointmentText(type);
  }

}
