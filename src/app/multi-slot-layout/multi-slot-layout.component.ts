/**
 * Component that has three horizontal separated sections
 * 
 * @example
 * <multi-slot-layout>
 *   <first-slot>
 *       Content
 *   </first-slot>
 *   <second-slot>
 *       Content
 *   </second-slot>
 *   <third-slot>
 *       Content
 *   </third-slot>
 * </multi-slot-layout>
 */

import { Component } from '@angular/core';
import { CommonInputComponent } from './common/bd-input/bd-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SwitchState } from '../shared/enums/switchState';

@Component({
    selector: 'multi-slot-layout',
    templateUrl: './multi-slot-layout.component.html',
    styleUrls: [
        './multi-slot-layout.component.css'
    ]
})
export class MultiSlotLayoutComponent {

    private currentState: SwitchState = SwitchState.AllSlotsVisible;
    private switchStateEnum: any = SwitchState;

    private classes = {
        0: '',
        1: 'col-sm-12',
        2: 'col-sm-6',
        3: 'col-sm-4'
    };

    private slotsState = [
        SwitchState.FirstSlotVisible,
        SwitchState.SecondSlotVisible,
        SwitchState.ThirdSlotVisible
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
            this.setCurrentState(this.switchStateEnum.AllSlotsVisible);
        }
    }

    isVisible(state: SwitchState) {
        return !!(this.currentState & state);
    }

    setCurrentState(state: SwitchState = SwitchState.AllSlotsVisible) {
        if (isFinite(state) && (state <= this.switchStateEnum.All)) {
            this.currentState = state;
        }
    }

    getClass() {
        const columnsCount = this.slotsState.filter(value => {
            return !!(value & this.currentState);
        }).length;

        return this.classes[columnsCount];
    }
}
