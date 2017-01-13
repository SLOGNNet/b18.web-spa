import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: 'input, select, bd-dropdown',
  host: {'(blur)': 'onBlur($event)'}
})
export class BlurForwarderDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) {

  }

  onBlur(event: FocusEvent) {
    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('control-blur', { bubbles: true, detail: { relatedTarget: event.relatedTarget } })]);
  }
}
