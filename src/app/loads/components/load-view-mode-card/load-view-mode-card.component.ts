import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Stop, ContactInfo, TripStop } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent, PickupCommodityComponent } from '../../../forms';
import MockData from '../../../shared/services/data-services/mock-data';
import { find } from 'lodash';

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
  }
}
