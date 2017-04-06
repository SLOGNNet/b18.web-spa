import { Component, Optional, HostBinding, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'bd-validator-message',
  styleUrls: ['./bd-validator-message.component.scss'],
  templateUrl: './bd-validator-message.component.html',
})
export class BdValidatiorMessageComponent {
  @Input()
  message: String = '';
}
