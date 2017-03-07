import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-button',
  styleUrls: ['./bd-button.component.scss'],
  templateUrl: './bd-button.component.html'
})
export class BdButtonComponent {
  @Input() type: string = 'button';
  @Input() color: 'primary' | 'default' = 'default';
  @Input() disabled: boolean = false;
  @Input() text: any;
  @Output() click = new EventEmitter();

  onButtonClick() {
    if (this.disabled) return;

    this.click.emit();
  }
}
