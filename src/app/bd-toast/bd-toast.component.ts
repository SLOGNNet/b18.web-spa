import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../models';

@Component({
  selector: 'bd-toast',
  templateUrl: './bd-toast.component.html',
  styleUrls: ['./bd-toast.component.scss']
})
export class BdToastComponent implements OnInit {
  @Input() notification: Notification;

  constructor() { }

  ngOnInit() {
  }

}
