import { Component, Input } from '@angular/core';
import { Load } from '../../../models';

@Component({
    selector: 'load-stops',
    templateUrl: './load-stops.component.html',
    styleUrls: ['./load-stops.component.scss']
})
export class LoadStopsComponent {
  @Input()loads: Load;
}
