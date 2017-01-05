import { Component, Input } from '@angular/core';
import { Load } from '../../../models';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()loads: Load;
}
