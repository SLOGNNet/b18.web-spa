import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Trip, StopTypes, Commodity } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent, PickupCommodityComponent, DropoffpCommodityComponent } from '../../../../../forms/commodities-forms';

const stopColors = ['#d7d8db', '#d289dd', '#dfd78f'];

@Component({
  selector: 'trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripViewComponent {
  @Input() trip: Trip;
  @Input() isExpanded: boolean = false;

  private pickupCommodities: Array<any> = [];
  private dropoffCommodities: Array<any> = [];

  private commodityHeaders = [
      { name: 'NUMBER' },
      { name: 'P.O.' },
      { name: 'COMMO-<br />DITY' },
      { name: 'UNIT<br />TYPE' },
      { name: 'UNIT<br />COUNT' },
      { name: 'PALLET<br />COUNT' },
      { name: 'WEIGHT<br />(IBS)' }
    ];

    getStopColor(stopType: StopTypes){
      return stopColors[stopType];
    }
}
