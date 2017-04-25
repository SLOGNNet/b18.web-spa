import { Input, Output, EventEmitter, HostBinding } from '@angular/core';

export abstract class BaseCardComponent {
    @Input() item: any;
    @Input() active: boolean;
    public statusText: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @HostBinding('class.active') get isActive() {
      return this.active;
    }

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

    get fullName() {
      return `${this.item.firstName} ${this.item.middleName} ${this.item.lastName}`;
    }

}
