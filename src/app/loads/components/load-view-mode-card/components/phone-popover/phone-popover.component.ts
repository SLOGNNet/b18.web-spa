import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'phone-popover',
  templateUrl: './phone-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonePopoverComponent {
  @Input() phoneNumber: number;
}
