import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-form-button',
  styleUrls: ['./bd-form-button.component.scss'],
  templateUrl: './bd-form-button.component.html'
})
export class BdFormButtonComponent {
  @Input() buttonText: string;
  @Input() private buttonType: 'default' | 'small' = 'default';
}
