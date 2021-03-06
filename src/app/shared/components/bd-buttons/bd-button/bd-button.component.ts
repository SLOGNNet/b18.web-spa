import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-button',
  styleUrls: ['./bd-button.component.scss'],
  templateUrl: './bd-button.component.html'
})
export class BdButtonComponent {
  @Input() type: string = 'button';
  @Input() color: 'primary' | 'white' | 'default' = 'default';
  @Input() disabled: boolean = false;
  @Input() text: any;
  @Input() size: 'default-size' | 'small' = 'default-size';
}
