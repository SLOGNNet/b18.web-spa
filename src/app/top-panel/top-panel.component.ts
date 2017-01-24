import { Component, Input } from '@angular/core';
import { Contact } from '../models';

@Component({
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent {
  private testUser: Contact = new Contact();

  ngOnInit(){
    this.testUser.firstName = 'Ihor';
    this.testUser.lastName = 'Pidruchny';
  }

}
