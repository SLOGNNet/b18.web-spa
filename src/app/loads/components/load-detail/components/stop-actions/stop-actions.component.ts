import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StopAction, StopActionTypes } from '../../../../../models';
import { filter } from 'lodash';

@Component({
  selector: 'stop-actions',
  templateUrl: './stop-actions.component.html',
  styleUrls: ['./stop-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopActionsComponent {
  @Input() stopActions: Array<StopAction>;

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
    this.pickupCommodities = filter(this.stopActions, item => item.type === StopActionTypes.PICKUP);
    this.dropoffCommodities = filter(this.stopActions, item => item.type === StopActionTypes.DROPOFF);
  }
}
