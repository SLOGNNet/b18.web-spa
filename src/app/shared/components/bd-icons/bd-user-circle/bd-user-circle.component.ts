import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-user-circle',
  templateUrl: './bd-user-circle.component.html'
})
export class BdUserCircleComponent {

      @Input() fullName: string = '';
      @Input() private size: 'default' | 'small' = 'default';

      get userInitials() {
        return this.fullName.split(' ').reduce((previousValue, currentValue) => previousValue + currentValue[0], '');
      }
}
