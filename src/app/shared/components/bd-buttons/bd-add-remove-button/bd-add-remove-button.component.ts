import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-add-remove-button',
  styleUrls: ['./bd-add-remove-button.component.scss'],
  templateUrl: './bd-add-remove-button.component.html'
})
export class BdAddRemoveButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() prefixLabel: string = '';
  @Input() suffixLabel: string = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  protected iconClass: string = '';

  @HostListener('click', ['$event'])
  handleClick(event): void {
    if (!event.target.classList.contains('btn-icon') || this.disabled) return;
    this.onClick.emit(event);
  }
}
