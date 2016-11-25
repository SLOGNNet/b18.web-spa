import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadUtils } from './typeahead-utils';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TypeaheadContainerComponent, TypeaheadDirective],
  exports: [FormsModule, TypeaheadContainerComponent, TypeaheadDirective],
  providers: [TypeaheadUtils],
  entryComponents: [TypeaheadContainerComponent]
})
export class BdTypeaheadModule {
}
