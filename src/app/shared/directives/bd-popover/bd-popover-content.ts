import { Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { BdPopover } from './bd-popover.directive';
import { offsetParent, getElementPosition, getEffectivePlacement } from '../../helpers/positioning';

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
            max-width: none;
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

    @Input()
    horizontalOffset: number = 0;

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
    elWidth: number = undefined;

    constructor(protected element: ElementRef,
        protected cdr: ChangeDetectorRef) {
    }

    @HostListener('window:resize')
    onDocumentResize() {
        this.elWidth = undefined;
    }

    onDocumentMouseDown = (event: any) => {
        const element = this.element.nativeElement;
        if (!element || !this.popover) return;
        if (element.contains(event.target) || this.popover.getElement().contains(event.target)) return;
        this.hide();
        this.onCloseFromOutside.emit(undefined);
    }

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

    updateWidths() {
        if (this.width !== undefined) {
            this.elWidth = this.width;
        } else if (this.elWidth === undefined) {
            const offsetParentEl = offsetParent(this.popover.getElement());

            const maxElWidth = offsetParentEl.clientWidth;
            this.elWidth = Math.min(this.popoverDiv.nativeElement.clientWidth, maxElWidth);
        }
    }

    show(): void {
        if (!this.popover || !this.popover.getElement())
            return;

        this.updateWidths();

        this.effectivePlacement = getEffectivePlacement(this.placement, this.popover.getElement(), this.popoverDiv.nativeElement);
        const position = getElementPosition(this.popover.getElement(), this.popoverDiv.nativeElement, this.effectivePlacement);
        const adjustedPosition = this.adjustHorizontalPositionIfNeeded(
            position,
            this.effectivePlacement,
            this.elWidth,
            this.popover.getElement());

        this.displayType = 'block';
        this.top = adjustedPosition.top;
        this.left = adjustedPosition.left;
        this.arrowLeft = adjustedPosition.arrowLeft;
        this.isIn = true;
    }

    hide(): void {
        this.hideFromPopover();
        this.popover.hide();
        this.cdr.detectChanges();
    }

    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.arrowLeft = undefined;
        this.isIn = true;
    }

    adjustHorizontalPositionIfNeeded(position, effectivePlacement, elementWidth, popover: HTMLElement) {
        const offsetParentEl = offsetParent(popover);
        let result = {
            top: position.top,
            left: position.left,
            arrowLeft: undefined
        };

        if (elementWidth && (effectivePlacement === 'bottom' || effectivePlacement === 'top')) {
            const parentWidth = offsetParentEl.offsetWidth;

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

}
