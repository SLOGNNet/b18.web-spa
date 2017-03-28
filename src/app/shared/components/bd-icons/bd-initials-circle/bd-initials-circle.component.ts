import { Component, Input } from '@angular/core';

const DEFAULT_INITIALS = 'B18';

@Component({
  selector: 'bd-initials-circle',
  styleUrls: ['./bd-initials-circle.component.scss'],
  templateUrl: './bd-initials-circle.component.html'
})
export class BdInitialsCircleComponent {

      @Input() private firstName: string = '';
      @Input() private lastName: string = '';
      @Input() private size: 'default' | 'small' = 'default';
      @Input() parentHover: boolean = false;

      get userInitials(){
        if (!this.firstName && !this.lastName) return DEFAULT_INITIALS;
        return this.firstName.charAt(0) + this.lastName.charAt(0);
      }
}
