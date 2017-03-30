import { Component, Input } from '@angular/core';

const DEFAULT_INITIALS = 'B18';

@Component({
  selector: 'bd-circle',
  styleUrls: ['./bd-circle.component.scss'],
  templateUrl: './bd-circle.component.html'
})
export class BdCircleComponent {

      @Input() initials: string = '';
      @Input() parentHover: boolean = false;
      @Input() active: any;
      @Input() private size: 'default' | 'small' = 'default';

      get dataInitials(){
        if (!this.initials) return DEFAULT_INITIALS;
        return this.initials;
      }

      ngOnInit() {
        console.log(this.parentHover, 'parentHover');
      }
}
