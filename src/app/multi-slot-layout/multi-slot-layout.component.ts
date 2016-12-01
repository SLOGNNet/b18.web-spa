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
import { SwitchState } from '../shared/enums/SwitchState';

@Component({
    selector: 'multi-slot-layout',
    templateUrl: './multi-slot-layout.component.html',
    styleUrls: [
        './multi-slot-layout.component.css'
    ]
})
export class MultiSlotLayoutComponent {

    private currentState: SwitchState = SwitchState.ALL;
    private switchStateEnum: any = SwitchState;

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
            this.setCurrentState(SwitchState.ALL);
        }
    }

    isVisible(state: SwitchState) {
        return !!(this.currentState & state);
    }

    setCurrentState(state: SwitchState = SwitchState.ALL) {
        this.currentState = state;
    }

    getClass() {
        const slotsState = [
            SwitchState.FIRST_SLOT_VISIBLE,
            SwitchState.SECOND_SLOT_VISIBLE,
            SwitchState.THIRD_SLOT_VISIBLE
        ];

        const classes = {
            0: 'none',
            1: 'col-sm-12',
            2: 'col-sm-6',
            3: 'col-sm-4'
        };

        const columnsCount = slotsState.filter(value => {
            return (value & this.currentState) > 0;
        }).length;

        return classes[columnsCount];
    }
}
