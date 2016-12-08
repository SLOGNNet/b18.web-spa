import { Component, Input } from '@angular/core';

@Component({
  selector: 'expandable-panel',
  styleUrls: ['./expandable-panel.component.scss'],
  templateUrl: './expandable-panel.component.html'
})
export class ExpandablePanelComponent {
  private isCustomerForm: boolean;
  private isArrow: boolean = true;

  showForm(){
    this.isCustomerForm = true;
    this.isArrow = false;
  }

  hideForm(){
    this.isCustomerForm = false;
    this.isArrow = true;
  }
}
