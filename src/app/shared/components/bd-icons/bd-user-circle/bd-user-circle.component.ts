import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-user-circle',
  styleUrls: ['./bd-user-circle.component.scss'],
  templateUrl: './bd-user-circle.component.html'
})
export class BdUserCircleComponent {

      @Input() initials: string = '';
      @Input() private size: 'default' | 'small' = 'default';

      get userInitials() {
        return this.initials.split(' ').reduce((fst, snd) => fst + snd[0], '');
      }
}
