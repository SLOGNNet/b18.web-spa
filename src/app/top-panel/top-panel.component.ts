import { Component, Input } from '@angular/core';
import { Contact } from '../models';

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


constructor(){
  this.date2.setDate(this.date1.getDate() - 1);
  this.date3.setDate(this.date1.getDate() - 3);
}

  ngOnChanges(){
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
    this.date2.setDate(this.date1.getDate() - 1);
    this.date3.setDate(this.date1.getDate() - 3);
  }

}
