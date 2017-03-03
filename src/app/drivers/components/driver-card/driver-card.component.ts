import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Driver } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverCardComponent {
  @Input() driver: Driver;
  @Output() select: EventEmitter<any> = new EventEmitter();
  public statusText: boolean = false;

  get driverStatusColor(): string {
    return Driver.getStatusColor(this.driver.status);
  }

  get driverTypeText(): string {
    return Driver.getTypeText(this.driver.type);
  }

  get driverStatusText(): string {
    return Driver.getStatusText(this.driver.status);
  }

  onClick() {
    this.select.emit(this.driver);
  }

  onEnter() {
    this.statusText = true;
  }

  onLeave() {
    this.statusText = false;
  }
}
