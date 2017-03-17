import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-view-detail-section',
  templateUrl: './bd-view-detail-section.component.html',
  styleUrls: ['./bd-view-detail-section.component.scss']
})
export class BdViewDetailSectionComponent {
  @Input() private labelText: string = '';
  @Input() private addContent: string = '';
  @Input() private changeButton: boolean = true;
  @Input() private addButton: boolean = true;
}
