import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-view-detail',
  templateUrl: './bd-view-detail.component.html',
  styleUrls: ['./bd-view-detail.component.scss']
})
export class BdViewDetailComponent {
  @Input() private labelText: string = '';
  @Input() private changeButton: boolean = true;
  @Input() private addButton: boolean = true;
}
