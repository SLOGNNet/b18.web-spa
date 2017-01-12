import { Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { BdPopover } from './bd-popover.directive';

@Component({
    selector: 'bd-popover-content',
    template: `
        <div #popoverDiv class="popover {{ effectivePlacement }}"
            [style.top]="top + 'px'"
            [style.left]="left + 'px'"
            [style.width]="width + 'px'"
            [class.in]="isIn"
            [class.fade]="animation"
            style="display: block"
            role="popover">
            <div [hidden]="!closeOnMouseOutside" class="virtual-area"></div>
            <div class="arrow" [style.left]="arrowLeft + 'px'"></div> 
            <h3 class="popover-title" [hidden]="!title">{{ title }}</h3>
            <div class="popover-content">
                <ng-content></ng-content>
                {{ content }}
            </div> 
        </div>
    `,
    styles: [`
        .popover {
            background: white;
            box-shadow: 0px 0px 12px 0px #8c8c8c;
            border: none;
        }
        .popover .virtual-area {
            height: 11px;
            width: 100%;
            position: absolute;
        }
        .popover.top .virtual-area {
            bottom: -11px; 
        }
        .popover.bottom .virtual-area {
            top: -11px; 
        }
        .popover.left .virtual-area {
            right: -11px; 
        }
        .popover.right .virtual-area {
            left: -11px; 
        }
    `]
})
export class BdPopoverContent implements AfterViewInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs / Outputs 
    // -------------------------------------------------------------------------

    // @Input()
    // hostElement: HTMLElement;
    @Input()
    horizontalOffset: number = 20;

    @Input()
    width: number;

    @Input()
    height: number;

    @Input()
    content: string;

    @Input()
    placement: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'auto top' | 'auto bottom' | 'auto left' | 'auto right' = 'bottom';

    @Input()
    title: string;

    @Input()
    animation: boolean = true;

    @Input()
    closeOnClickOutside: boolean = false;

    @Input()
    closeOnMouseOutside: boolean = false;

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    @ViewChild('popoverDiv')
    popoverDiv: ElementRef;

    popover: BdPopover;
    onCloseFromOutside = new EventEmitter();
    top: number = -10000;
    left: number = -10000;
    isIn: boolean = false;
    displayType: string = 'none';
    effectivePlacement: string;
    arrowLeft: number = undefined;

    // -------------------------------------------------------------------------
    // Anonymous 
    // -------------------------------------------------------------------------

    /**
     * Closes dropdown if user clicks outside of this directive.
     */
    onDocumentMouseDown = (event: any) => {
        const element = this.element.nativeElement;
        if (!element || !this.popover) return;
        if (element.contains(event.target) || this.popover.getElement().contains(event.target)) return;
        this.hide();
        this.onCloseFromOutside.emit(undefined);
    }

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(protected element: ElementRef,
        protected cdr: ChangeDetectorRef) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngAfterViewInit(): void {
        if (this.closeOnClickOutside)
            document.addEventListener('mousedown', this.onDocumentMouseDown);
        if (this.closeOnMouseOutside)
            document.addEventListener('mouseover', this.onDocumentMouseDown);

        this.show();
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        if (this.closeOnClickOutside)
            document.removeEventListener('mousedown', this.onDocumentMouseDown);
        if (this.closeOnMouseOutside)
            document.removeEventListener('mouseover', this.onDocumentMouseDown);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    show(): void {
        if (!this.popover || !this.popover.getElement())
            return;

        const position = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        const adjustedPosition = this.adjustHorizontalPositionIfNeeded(
            position,
            position.effectivePlacement,
            this.width,
            this.popoverDiv.nativeElement.offsetParent);

        this.displayType = 'block';
        this.top = adjustedPosition.top;
        this.left = adjustedPosition.left;
        this.arrowLeft = adjustedPosition.arrowLeft;
        this.isIn = true;
    }

    hide(): void {
        this.top = -10000;
        this.left = -10000;
        this.arrowLeft = undefined;
        this.isIn = true;
        this.popover.hide();
    }

    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.arrowLeft = undefined;
        this.isIn = true;
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    protected adjustHorizontalPositionIfNeeded(position, effectivePlacement, elementWidth, offsetParent: HTMLElement) {
        let result = {
            top: position.top,
            left: position.left,
            arrowLeft: undefined
        };

        if (elementWidth && (effectivePlacement === 'bottom' || effectivePlacement === 'top')) {
            const parentWidth = offsetParent.offsetWidth;

            if (position.left + elementWidth > parentWidth + this.horizontalOffset) {
                const diff = (position.left + elementWidth) - parentWidth - this.horizontalOffset;
                result.left = position.left - diff;
                result.arrowLeft = elementWidth / 2 + diff;
            } else if (position.left < -this.horizontalOffset) {
                const diff = position.left - -this.horizontalOffset;
                result.left = position.left - diff;
                result.arrowLeft = elementWidth / 2 + diff;
            }
        }

        return result;
    }

    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody: boolean = false) {
        let positionStrParts = positionStr.split('-');
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || 'center';
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = this.width || targetEl.offsetWidth;
        let targetElHeight = this.height || targetEl.offsetHeight;

        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);

        let shiftWidth: any = {
            center: function (): number {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function (): number {
                return hostElPos.left;
            },
            right: function (): number {
                return hostElPos.left + hostElPos.width;
            }
        };

        let shiftHeight: any = {
            center: function (): number {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function (): number {
                return hostElPos.top;
            },
            bottom: function (): number {
                return hostElPos.top + hostElPos.height;
            }
        };

        let targetElPos = { top: 0, left: 0, effectivePlacement: this.effectivePlacement };

        switch (pos0) {
            case 'right':
                targetElPos.top = shiftHeight[pos1]();
                targetElPos.left = shiftWidth[pos0]();
                break;

            case 'left':
                targetElPos.top = shiftHeight[pos1]();
                targetElPos.left = hostElPos.left - targetElWidth;
                break;

            case 'bottom':
                targetElPos.top = shiftHeight[pos0]();
                targetElPos.left = shiftWidth[pos1]();
                break;

            default:
                targetElPos.top = hostElPos.top - targetElHeight;
                targetElPos.left = shiftWidth[pos1]();
                break;
        }

        return targetElPos;
    }

    protected position(nativeEl: HTMLElement): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }

    protected offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }

    protected getStyle(nativeEl: HTMLElement, cssProp: string): string {
        if ((nativeEl as any).currentStyle) // IE
            return (nativeEl as any).currentStyle[cssProp];

        if (window.getComputedStyle)
            return (window.getComputedStyle as any)(nativeEl)[cssProp];

        // finally try and get inline style
        return (nativeEl.style as any)[cssProp];
    }

    protected isStaticPositioned(nativeEl: HTMLElement): boolean {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }

    protected parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    protected getEffectivePlacement(placement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
        const placementParts = placement.split(' ');
        if (placementParts[0] !== 'auto') {
            return placement;
        }

        const hostElBoundingRect = hostElement.getBoundingClientRect();

        const desiredPlacement = placementParts[1] || 'bottom';

        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }

        return desiredPlacement;
    }
}
