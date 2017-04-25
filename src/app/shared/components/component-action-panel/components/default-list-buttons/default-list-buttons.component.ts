import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'default-list-buttons',
  templateUrl: './default-list-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
