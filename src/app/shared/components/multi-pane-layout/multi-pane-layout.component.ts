/**
 * Component that has three horizontal separated sections
 *
 * @example
 * <multi-pane-layout>
 *   <first-pane>
 *       Content
 *   </first-pane>
 *   <second-pane>
 *       Content
 *   </second-pane>
 *   <third-pane>
 *       Content
 *   </third-pane>
 * </multi-pane-layout>
 */

import { Component, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwitchState } from '../../enums/switchState';
import { BdResizeContainerComponent } from '../bd-resizer';
import { AppState } from '../../../app.service';

@Component({
    selector: 'multi-pane-layout',
    templateUrl: './multi-pane-layout.component.html',
    styleUrls: [
        './multi-pane-layout.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiPaneLayoutComponent {

    private currentState: SwitchState = SwitchState.AllPanesVisible;
    private switchStateEnum: any = SwitchState;
    private resizerWidth = 20;
    private resizerMin = 320;
    private resizerDirection = 'horizontal';
    private resizeSecondPane = null;
    private panesWidth = [];

    private panesState = [
        SwitchState.FirstPaneVisible,
        SwitchState.SecondPaneVisible,
        SwitchState.ThirdPaneVisible
    ];

    @ViewChildren(BdResizeContainerComponent) private bdResizeComponents: QueryList<BdResizeContainerComponent>;

    constructor(
        public appState: AppState,
        private cdr: ChangeDetectorRef) {
    }

    ngDoCheck() {
        if (this.currentState !== this.appState.get('switchState')) {
            this.setCurrentState(this.appState.get('switchState'));
            this.setPanesWidth(this.appState.getPanesWidth(this.currentState));
            this.resizeSecondPane = this.getSecondPane();
            this.cdr.markForCheck();
        }
    }

    ngAfterViewInit() {
        if (isNaN(this.currentState)) {
            this.setCurrentState(this.switchStateEnum.AllPanesVisible);
        }

        this.resizeSecondPane = this.getSecondPane();
        this.setPanesWidth(this.appState.getPanesWidth(this.currentState));
    }

    onResizerChange() {
        this.panesWidth = this.bdResizeComponents.map(e => e.getWidth()).map(w => parseFloat(w));
        this.appState.setPanesWidth(this.currentState, this.panesWidth);
    }

    isVisible(state: SwitchState) {
        return !!(this.currentState & state);
    }

    setCurrentState(state: SwitchState = SwitchState.AllPanesVisible) {
        this.currentState = state;
    }

    setPanesWidth(widths: Array<number>) {
        if (!this.bdResizeComponents) {
            return;
        }
console.log(widths);
        this.panesWidth = widths;
        this.cdr.detectChanges();
    }

    getSecondPane() {
        if (this.bdResizeComponents) {
            const result = this.bdResizeComponents.filter((c, i) => this.isVisible(this.panesState[i]))[1];
            return result;
        }

        return null;
    }
}
