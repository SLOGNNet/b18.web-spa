import { Component, Input } from '@angular/core';
import { Contact } from '../models';
import { TaskNotification } from '../models';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent {
  private testUser: Contact = new Contact();
  private notifications: Array<TaskNotification> = [{
    name: 'Add Load Commodity name 1',
    eventType: 1,
    message: 'message',
    priority: 0,
    date: 'date 1'
  },
  {
    name: 'Add Load Commodity name 2',
    eventType: 2,
    message: 'my message 2',
    priority: 1,
    date: 'date 2'
  },
  {
    name: 'Add Load Commodity name 3',
    eventType: 3,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    priority: 2,
    date: 'date 3'
  },
  {
    name: 'Add Load Commodity name 4',
    eventType: 4,
    message: 'my message 4',
    priority: 1,
    date: 'date 4'
  },
  {
    name: 'Add Load Commodity name 5',
    eventType: 1,
    message: 'my message 5',
    priority: 0,
    date: 'date 5'
  }
  ];

  ngOnInit(){
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
  }

}
