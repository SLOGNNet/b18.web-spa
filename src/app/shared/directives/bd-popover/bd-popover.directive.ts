import { Directive,
    HostListener,
    ComponentRef,
    ViewContainerRef,
    ElementRef,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter } from '@angular/core';
import { BdPopoverContent } from './bd-popover-content';

@Directive({
    selector: '[bd-popover]',
    exportAs: 'bd-popover'
})
export class BdPopover implements OnChanges {
    protected bdPopoverComponent = BdPopoverContent;
    protected bdPopover: ComponentRef<BdPopoverContent>;
    protected visible: boolean;
    protected triggeredByClick: boolean = false;
    showTimeOut = null;

    @Input('bd-popover')
    content: string | BdPopoverContent;

    @Input()
    popoverDisabled: boolean;

    @Input()
    popoverAnimation: boolean;

    @Input()
    popoverPlacement: 'top'|'bottom'|'left'|'right'|'auto'|'auto top'|'auto bottom'|'auto left'|'auto right';

    @Input()
    popoverTitle: string;

    @Input()
    popoverOnHover: boolean = false;

    @Input()
    popoverCloseOnClickOutside: boolean;

    @Input()
    popoverCloseOnMouseOutside: boolean;

    @Input()
    popoverShowTimeout: number = 200;

    @Input()
    popoverDismissTimeout: number = 0;

    @Output()
    onShown = new EventEmitter<BdPopover>();

    @Output()
    onHidden = new EventEmitter<BdPopover>();

    constructor(protected element: ElementRef,
                protected viewContainerRef: ViewContainerRef,
                protected resolver: ComponentFactoryResolver) {
    }

    @HostListener('click')
    showOrHideOnClick(): void {
        this.element.nativeElement.style.zIndex = '';

        if (this.popoverDisabled) return;

        if (this.visible && !this.triggeredByClick) {
            this.triggeredByClick = true;
            return;
        } else if (!this.triggeredByClick) {
            this.triggeredByClick = true;
        }
        this.toggle();
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    showOnHover(): void {
        if (!this.popoverOnHover) return;
        if (this.popoverDisabled) return;
        this.showTimeOut = setTimeout( () => {
          this.show();
          this.element.nativeElement.style.zIndex = 999999;
        }, this.popoverShowTimeout);
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hideOnHover(): void {
        this.element.nativeElement.style.zIndex = '';
        if (!this.popoverOnHover) return;
        if (this.popoverDisabled || this.triggeredByClick) return;
        clearTimeout(this.showTimeOut);
        this.hide();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['popoverDisabled']) {
            if (changes['popoverDisabled'].currentValue) {
                this.hide();
            }
        }
    }

    toggle() {
        if (!this.visible) {
            this.show();
        } else {
            this.hide();
        }
    }

   show() {
        if (this.visible) return;

        this.visible = true;
        if (typeof this.content === 'string') {
            const factory = this.resolver.resolveComponentFactory(this.bdPopoverComponent);
            if (!this.visible)
                return;

            this.bdPopover = this.viewContainerRef.createComponent(factory);
            const popover = this.bdPopover.instance as BdPopoverContent;
            popover.popover = this;
            popover.content = this.content as string;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;

            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
        } else {
            const popover = this.content as BdPopoverContent;
            popover.popover = this;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;

            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            popover.show();
        }

        this.onShown.emit(this);
    }

    hide() {
        this.triggeredByClick = false;

        if (!this.visible) return;

        this.visible = false;
        if (this.bdPopover)
            this.bdPopover.destroy();

        if (this.content instanceof BdPopoverContent)
            (this.content as BdPopoverContent).hideFromPopover();

        this.onHidden.emit(this);
    }

    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }

}
