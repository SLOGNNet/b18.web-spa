import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'default-component-action-panel',
  templateUrl: './default-component-action-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponentActionPanelComponent {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onEdit() {
    this.edit.emit();
  }

  onRemove() {
    this.remove.emit();
  }
}
