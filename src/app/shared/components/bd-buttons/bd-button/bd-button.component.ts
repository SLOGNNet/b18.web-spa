import { Component, Input, HostBinding, HostListener } from '@angular/core';

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

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.disabled = true;
  }

  @HostListener('mouseup', ['$event'])
 onMouseup() {
     this.disabled = false;
 }
}
