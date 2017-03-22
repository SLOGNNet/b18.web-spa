import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseCardComponent {
    @Input() item: any;
    public statusText: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();

    protected abstract itemStatusText();

    protected abstract itemStatusColor();

    onClick() {
      this.select.emit(this.item);
    }

    onEnter() {
      this.statusText = true;
    }

    onLeave() {
      this.statusText = false;
    }

    ngOnInit() {
      console.log(this.item);
    }

}
