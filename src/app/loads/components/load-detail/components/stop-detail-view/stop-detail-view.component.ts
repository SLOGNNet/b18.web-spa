import { Component, OnInit, Input } from '@angular/core';
import { Stop } from '../../../../../models';

@Component({
  selector: 'stop-detail-view',
  templateUrl: './stop-detail-view.component.html',
  styleUrls: ['./stop-detail-view.component.scss']
})
export class StopDetailViewComponent implements OnInit {
  @Input() isExpanded: boolean;
  @Input() stop: Stop;
  constructor() { }

  ngOnInit() {
  }

}
