import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'list-item-control',
  templateUrl: './list-item-control.component.html',
  styleUrls: ['./list-item-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemControlComponent {
  @Input() showDefaultButtons: boolean = false;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onEditClick() {
    this.edit.emit();
  }

  onRemoveClick() {
    this.remove.emit();
  }
}
