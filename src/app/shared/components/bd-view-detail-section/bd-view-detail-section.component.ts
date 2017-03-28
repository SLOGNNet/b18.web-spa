import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-view-detail-section',
  templateUrl: './bd-view-detail-section.component.html',
  styleUrls: ['./bd-view-detail-section.component.scss']
})
export class BdViewDetailSectionComponent {
  @Input() private parentHover: boolean = false;
  @Input() private labelText: string = '';
  @Input() private addContent: string = '';
  @Input() private editButton: boolean = true;
  @Input() private addButton: boolean = true;
  @Output() private editClick: EventEmitter<any> = new EventEmitter();
  @Output() private addClick: EventEmitter<any> = new EventEmitter();

  onEditClick() {
    this.editClick.emit();
  }

  onAddClick() {
    this.addClick.emit();
  }
}
