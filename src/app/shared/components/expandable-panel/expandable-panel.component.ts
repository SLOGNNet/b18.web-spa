import { Component, Input } from '@angular/core';

@Component({
  selector: 'expandable-panel',
  styleUrls: ['./expandable-panel.component.scss'],
  templateUrl: './expandable-panel.component.html'
})
export class ExpandablePanelComponent {
  private isExpanded: boolean = true;

  toggleForm(){
    this.isExpanded = !this.isExpanded;
  }
}
