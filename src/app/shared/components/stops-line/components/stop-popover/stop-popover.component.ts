import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopTypes } from '../../../../../models';

@Component({
  selector: 'stop-popover',
  templateUrl: './stop-popover.component.html',
  styleUrls: ['./stop-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopPopoverComponent implements OnInit {
  @Input() stop: Stop;

  constructor() { }

  ngOnInit() {

  }

  get statusText() {
    return Stop.getStatusText(this.stop.status);
  }

  get typeText() {
    return Stop.getTypeText(this.stop.type);
  }

}
