import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, StopActionTypes } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent, PickupCommodityComponent, DropoffpCommodityComponent } from '../../../../../forms/commodities-forms';
import { find, map } from 'lodash';

const stopColors = ['#d7d8db', '#d289dd', '#dfd78f'];

@Component({
  selector: 'trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripViewComponent {
  @Input() tripData: TripStop;
  @Input() isExpanded: boolean = false;

  public pickupCommodities: Array<any> = [];
  public dropoffCommodities: Array<any> = [];
  public appointmentType: string = '';
  public phoneNumber: string = '';

  public commodityHeaders = [
      { name: 'NUMBER' },
      { name: 'P.O.' },
      { name: 'COMMO-<br />DITY' },
      { name: 'UNIT<br />TYPE' },
      { name: 'UNIT<br />COUNT' },
      { name: 'PALLET<br />COUNT' },
      { name: 'WEIGHT<br />(IBS)' }
    ];

    public getStopColor(stopType: StopTypes){
      return stopColors[stopType];
    }

  ngOnInit() {
    this.appointmentType = this.getAppointmentType(this.tripData.appointment.type);
    this.phoneNumber = find(this.tripData.facility.contactInfo, item => item.label === 'primaryPhone').value;

    map(this.tripData.stopActions, item => {
      if (item.type === StopActionTypes.Pickup) this.pickupCommodities.push(item.commodity);
    });
    map(this.tripData.stopActions, item => {
      if (item.type === StopActionTypes.Dropoff) this.dropoffCommodities.push(item.commodity);
    });
  }

  getAppointmentType(type: AppointmentTypes) {
    return Appointment.getAppointmentText(type);
  }
}
