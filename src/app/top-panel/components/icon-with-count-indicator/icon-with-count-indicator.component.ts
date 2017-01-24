import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-with-count-indicator',
  templateUrl: './icon-with-count-indicator.component.html',
  styleUrls: ['./icon-with-count-indicator.component.scss']
})
export class IconWithCountIndicatorComponent {
  @Input() class: string;
  @Input() count: any;
  defineClass: string;

  ngOnInit() {
    if (this.count > 0) {
      if (this.count >= 1000) {
        this.count = 999;
      }
      this.defineClass = 'digit-number-' + this.count.toString().length;
    } else {
      this.defineClass = '';
      this.count = null;
    }
  }
}
