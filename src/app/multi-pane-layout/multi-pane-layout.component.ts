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

@Component({
    selector: 'multi-pane-layout',
    templateUrl: './multi-pane-layout.component.html',
    styleUrls: [
        './multi-pane-layout.component.css'
    ]
})
export class MultiPaneLayoutComponent {

    private currentState: SwitchState = SwitchState.AllPanesVisible;
    private switchStateEnum: any = SwitchState;

    private classes = {
        0: '',
        1: 'col-sm-12',
        2: 'col-sm-6',
        3: 'col-sm-4'
    };

    private panesState = [
        SwitchState.FirstPaneVisible,
        SwitchState.SecondPaneVisible,
        SwitchState.ThirdPaneVisible
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                const newState = parseInt(params['switchState'], 10);

                this.setCurrentState(newState);
            });
    }

    ngAfterViewInit() {
        if (isNaN(this.currentState)) {
            this.setCurrentState(this.switchStateEnum.AllPanesVisible);
        }
    }

    isVisible(state: SwitchState) {
        return !!(this.currentState & state);
    }

    setCurrentState(state: SwitchState = SwitchState.AllPanesVisible) {
        if (isFinite(state) && (state <= this.switchStateEnum.All)) {
            this.currentState = state;
        }
    }

    getClass() {
        const columnsCount = this.panesState.filter(value => {
            return !!(value & this.currentState);
        }).length;

        return this.classes[columnsCount];
    }
}
