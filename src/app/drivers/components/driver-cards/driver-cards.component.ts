import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Driver } from '../../../models';

@Component({
    selector: 'driver-cards',
    templateUrl: './driver-cards.component.html',
    styleUrls: ['./driver-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverCardsComponent {
  @Input() drivers: Array<Driver>;
}
