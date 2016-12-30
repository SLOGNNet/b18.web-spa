import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'navigation-anchor',
  template: '',
  styleUrls: ['./navigation-anchor.component.scss']
})
export class NavigationAnchorComponent {
  @HostBinding('class.nested-form')
  @Input()
  isNestedForm: boolean = false;
}
