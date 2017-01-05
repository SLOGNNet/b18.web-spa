import { Component, Input } from '@angular/core';
import { Load } from '../../../models';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() load: Load;

  get loadStatusColor() {
    return Load.getStatusColor(this.load.status);
  }

  get loadStatusText() {
    return Load.getStatusText(this.load.status);
  }
}
