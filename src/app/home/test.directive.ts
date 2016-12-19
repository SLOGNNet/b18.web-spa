import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[test]'
})
export class testDirective {
    constructor(private _elementRef: ElementRef) {
      _elementRef.nativeElement.style.color = 'red';
    }

    ngOnInit() {
      console.log('on init');
    }


    @HostListener('blur')
    public onBlur(): void {
        console.log('blur')
        }

        @HostListener('focus')
        public onFocus(): void {
            console.log('focussss')
            }

    }
