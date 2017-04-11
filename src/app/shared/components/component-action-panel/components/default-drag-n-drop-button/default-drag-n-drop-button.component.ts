import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-drag-n-drop-button',
  templateUrl: './default-drag-n-drop-button.component.html',
  styleUrls: ['./default-drag-n-drop-button.component.scss']
})
export class DefaultDragNDropButtonComponent {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onEditClick() {
    this.edit.emit();
  }

  onRemoveClick() {
    this.remove.emit();
  }
}
