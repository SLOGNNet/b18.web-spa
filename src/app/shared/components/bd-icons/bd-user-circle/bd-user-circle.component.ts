import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-user-circle',
  styleUrls: ['./bd-user-circle.component.scss'],
  templateUrl: './bd-user-circle.component.html'
})
export class BdUserCircleComponent {

      @Input() initials: string = '';
      @Input() parentHover: boolean = false;
      @Input() private size: 'default' | 'small' = 'default';

      get userInitials() {
          return this.initials.substr(0, this.initials.indexOf(' ')).charAt(0) + this.initials.substr(this.initials.indexOf(' ') + 1).charAt(0);
      }
}
