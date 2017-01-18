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

import { Component } from '@angular/core';
import { CommonInputComponent } from './common/bd-input/bd-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SwitchState } from '../shared/enums/switchState';
import { AppState } from '../app.service';

@Component({
    selector: 'multi-pane-layout',
    templateUrl: './multi-pane-layout.component.html',
    styleUrls: [
        './multi-pane-layout.component.scss'
    ]
})
export class MultiPaneLayoutComponent {

    private currentState: SwitchState = SwitchState.AllPanesVisible;
    private switchStateEnum: any = SwitchState;
    private resizerWidth = 20;
    private resizerMin = 320;
    private resizerDiection = 'horizontal';

    private widths = {
        0: 0,
        1: 100,
        2: 50,
        3: 33.33333333
    };

    private panesState = [
        SwitchState.FirstPaneVisible,
        SwitchState.SecondPaneVisible,
        SwitchState.ThirdPaneVisible
    ];

    constructor(
        public appState: AppState) {
    }

    ngAfterViewInit() {
        if (isNaN(this.currentState)) {
            this.setCurrentState(this.switchStateEnum.AllPanesVisible);
        }
    }

    getCurrentState() {
      return this.appState.get('switchState');
    }

    isVisible(state: SwitchState) {
        console.log(state, !!( this.getCurrentState() & state));
        return !!( this.getCurrentState() & state);
    }

    setCurrentState(state: SwitchState = SwitchState.AllPanesVisible) {
      this.currentState = state;
    }

    getWidth() {
        const columnsCount = this.panesState.filter(value => {
            return !!(value & this.getCurrentState());
        }).length;

        return this.widths[columnsCount];
    }
}
