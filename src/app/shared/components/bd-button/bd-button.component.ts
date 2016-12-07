import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'bd-button',
  styleUrls: ['./bd-button.component.scss'],
  templateUrl: './bd-button.component.html'
})
export class BdButtonComponent {
  @Input() type: string;
  @Input() disabled: boolean = false;
  @Input() text: any;
}
