import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-list-buttons',
  templateUrl: './default-list-buttons.component.html'
})
export class DefaultListButtonsComponent {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onEditClick() {
    this.edit.emit();
  }

  onRemoveClick() {
    this.remove.emit();
  }
}
