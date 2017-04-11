import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'list-buttons-control',
  templateUrl: './list-buttons-control.component.html',
  styleUrls: ['./list-buttons-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListButtonsControlComponent {
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
