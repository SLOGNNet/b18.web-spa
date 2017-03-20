import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-unit-log',
  styleUrls: ['bd-unit-log.component.scss'],
  templateUrl: './bd-unit-log.component.html'
})
export class BdUnitLogComponent {
  @Input() value: string = '1234';
  @Input() type: string = 'mls';
  @Input() date: Date = new Date();
}
