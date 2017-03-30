import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseCardComponent {
    @Input() item: any;
    @Input() parentHover: boolean = false;
    @Input() active: any;
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

    get initials() {
        return this.item.firstName + ' ' + this.item.lastName;
    }

}
