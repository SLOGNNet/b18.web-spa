import { HostBinding } from '@angular/core';

export abstract class BaseCardListComponent {
   @HostBinding('class.interactive-panel') v: boolean = true;
}
