import { Component, Input } from '@angular/core';
import { Contact } from '../models';
import { NotificationCard } from '../models';
import { TaskNotification } from '../models';
import { Notification, NotificationType } from '../models';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent {
  private testUser: Contact = new Contact();
  private date1: Date = new Date();
  private date2: Date = new Date();
  private date3: Date = new Date();

  private latestNotifications: Array<NotificationCard> = [{
    name: 'Create New Event',
    eventType: 1,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: 'date 1'
  },
  {
    name: 'Load Commodity Added',
    eventType: 2,
    message: 'message 2',
    date: 'date 2'
  },
  {
    name: 'Load Commodity not Added',
    eventType: 3,
    message: 'message 3',
    date: 'date 3'
  },
  {
    name: 'Load commodity Added',
    eventType: 2,
    message: 'message 4',
    date: 'date 4'
  },
  {
    name: 'Load commodity Added',
    eventType: 2,
    message: 'message 5',
    date: 'date 5'
}];

  private taskNotifications: Array<TaskNotification> = [{
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

  private testNotifications: Array<Notification> = [
    {
      id: 1,
      content: "test content",
      type: NotificationType.message,
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser
    },
    {
      id: 2,
      content: "test content",
      type: NotificationType.message,
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser
    },{
      id: 3,
      content: "test content",
      type: NotificationType.message,
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser
    },{
      id: 1,
      content: "test content",
      type: NotificationType.message,
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser
    }
  ];


constructor(){
  this.date2.setDate(this.date1.getDate() - 1);
  this.date3.setDate(this.date1.getDate() - 3);
}

  ngOnChanges(){
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
  }

}
