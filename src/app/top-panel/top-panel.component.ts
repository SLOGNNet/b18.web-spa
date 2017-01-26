import { Component, Input } from '@angular/core';
import { Contact } from '../models';
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

  private testNotifications: Array<Notification> = [
    {
      id: 1,
      type: NotificationType.message,
      title:"test title",
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser,
      priority: 0,
      taskType: 1,
      notificationStatus: 2
    },
    {
      id: 2,
      type: NotificationType.message,
      title:"test title",
      date: new Date(),
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser,
      priority: 1,
      taskType: 2,
      notificationStatus: 3
    },
    {
      id: 3,
      type: NotificationType.message,
      date: new Date(),
      title:"test title",
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser,
      priority: 2,
      taskType: 3,
      notificationStatus:1
    },
    {
      id: 4,
      type: NotificationType.message,
      date: new Date(),
      title:"test title",
      message: "Lorem ipsum dolor sit  ut labore estrud in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
      sender: this.testUser,
      priority: 2,
      taskType: 4,
      notificationStatus: 1
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
