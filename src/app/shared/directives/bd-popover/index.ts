import { CommonModule } from '@angular/common';
import { BdPopover } from './bd-popover.directive';
import { BdPopoverContent } from './bd-popover-content';
import { NgModule } from '@angular/core';

export * from './bd-popover.directive';
export * from './bd-popover-content';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BdPopoverContent,
        BdPopover,
    ],
    exports: [
        BdPopoverContent,
        BdPopover,
    ],
    entryComponents: [
        BdPopoverContent
    ]
})
export class BdPopoverModule {

}