import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Stop, ContactInfo, TripStop, Address, StopActionTypes } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent, PickupCommodityComponent } from '../../../forms';
import MockData from '../../../shared/services/data-services/mock-data';
import { find, map } from 'lodash';

@Component({
  selector: 'load-view-mode-card',
  templateUrl: './load-view-mode-card.component.html',
  styleUrls: ['./load-view-mode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewModeCardComponent {
  @Input() stop: Stop = MockData.loads[0].stops[0];
  public isExpanded: boolean = false;
  public pickupCommodities: Array<any> = [];
  public dropoffCommodities: Array<any> = [];

  private tripStops: Array<TripStop> = [];

  private primaryPhone: string = '';
  private altPhone: string = '';
  private fax: string = '';

  ngOnInit() {
    this.tripStops = this.stop.tripStops;
    this.primaryPhone = find(this.stop.facility.contactInfo, item => item.label === 'primaryPhone').value;
    this.altPhone = find(this.stop.facility.contactInfo, item => item.label === 'alternativePhone').value;
    this.fax = find(this.stop.facility.contactInfo, item => item.label === 'fax').value;

    this.tripStops.map(item => {
      map(item.stopActions, stopAction => {
          this.pickupCommodities = item.stopActions.filter(obj => obj.type === StopActionTypes.Pickup);
          this.dropoffCommodities = item.stopActions.filter(obj => obj.type === StopActionTypes.Dropoff);
      });
    });
  }

  onClick() {
    console.log('click');
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

}
