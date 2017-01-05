import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stop, StopTypes } from '../../../models';

@Component({
  selector: 'stops-line',
  templateUrl: './stops-line.component.html',
  styleUrls: ['./stops-line.component.scss']
})
export class StopsLineComponent implements OnInit {
  @Input() lineColor: string = 'lightGray';
  @Input() stops: Array<any>;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onStopSelect(selected) {
    this.select.emit(selected);
  }

  ngOnInit() {
    this.stops = [{
      id: 1,
      color: 'red',
      type: 1
    },
    {
      id: 2,
      color: 'green',
      type: 2
    },
    {
      id: 3,
      color: 'blue',
      type: 1
    }, {
      id: 4,
      color: 'green',
      type: 2
    }];
  }

isDropOff (type) {
  return type === StopTypes.Dropoff;
}
}
