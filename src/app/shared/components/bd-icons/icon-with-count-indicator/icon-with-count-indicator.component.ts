import { Component, Input, HostListener, ElementRef } from '@angular/core';

const MAX_NOTIFICATIONS_COUNT = 999;

@Component({
  selector: 'icon-with-count-indicator',
  templateUrl: './icon-with-count-indicator.component.html',
  styleUrls: ['./icon-with-count-indicator.component.scss']
})
export class IconWithCountIndicatorComponent {
  @Input() class: string;
  @Input() count: number;
  @Input() maxValue: number = MAX_NOTIFICATIONS_COUNT;

  @Input() private isActive: boolean = false;

  constructor(private _eref: ElementRef){}

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

  toggleActive(){
    this.isActive = !this.isActive;
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
      this.toggleActive();
  }

  @HostListener('window:click')
  onWindowClick(): void {
      if (this._eref.nativeElement.contains(event.target)) return;
      this.isActive = false;
  }

}
