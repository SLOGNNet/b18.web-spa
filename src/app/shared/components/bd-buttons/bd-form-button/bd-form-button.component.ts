import { Component, Input } from '@angular/core';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'bd-form-button',
  styleUrls: ['./bd-form-button.component.scss'],
  templateUrl: './bd-form-button.component.html'
})
export class BdFormButtonComponent {
  @Input() buttonText: string;
  @Input() private buttonType: 'default' | 'small' = 'default';
}
