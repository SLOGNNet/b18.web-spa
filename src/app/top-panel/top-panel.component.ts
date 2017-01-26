import { Component, Input } from '@angular/core';
import { Contact } from '../models';
import { NotificationCard } from '../models';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent {
  private testUser: Contact = new Contact();
  name: string;
  type: number;
  message: string;
  date: string;
  private latestNotifications: Array<NotificationCard> = [{
    name: 'Create New Event',
    type: 1,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: 'date 1'
  },
  {
    name: 'Load Commodity Added',
    type: 2,
    message: 'message 2',
    date: 'date 2'
  },
  {
    name: 'Load Commodity not Added',
    type: 3,
    message: 'message 3',
    date: 'date 3'
  },
  {
    name: 'Load commodity Added',
    type: 2,
    message: 'message 4',
    date: 'date 4'
  },
  {
    name: 'Load commodity Added',
    type: 2,
    message: 'message 5',
    date: 'date 5'
  }
  ];

  ngOnInit(){
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
  }

}
