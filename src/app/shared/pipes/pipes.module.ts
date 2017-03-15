import { NgModule } from '@angular/core';

import { BdTimeAgoPipe, BdDatePipe } from './index';

@NgModule({
  declarations: [BdTimeAgoPipe, BdDatePipe],
  exports: [BdTimeAgoPipe, BdDatePipe]
})
export class BdPipesModule { }
