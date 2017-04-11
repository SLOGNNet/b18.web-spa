import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-edit-remove-button',
  templateUrl: './default-edit-remove-button.component.html',
  styleUrls: ['./default-edit-remove-button.component.scss']
})
export class DefaultEditRemoveButtonComponent {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onEditClick() {
    this.edit.emit();
  }

  onRemoveClick() {
    this.remove.emit();
  }
}
