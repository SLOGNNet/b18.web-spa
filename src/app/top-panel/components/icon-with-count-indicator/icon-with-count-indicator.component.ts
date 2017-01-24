import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-with-count-indicator',
  templateUrl: './icon-with-count-indicator.component.html',
  styleUrls: ['./icon-with-count-indicator.component.scss']
})
export class IconWithCountIndicatorComponent {
  @Input() class: string;
  @Input() count: number;
  @Input() maxValue: number = 999;


  ngOnInit() {
    this.updateCount();
  }

  updateCount() {
    if (this.count > 0) {
      if (this.count > this.maxValue) {
        this.count = this.maxValue;
      }
    } else {
      this.count = null;
    }
  }

  ngOnChanges(changes) {
    if (changes.count) {
      this.updateCount();
    }
  }
}