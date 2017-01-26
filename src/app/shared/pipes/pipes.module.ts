import { NgModule } from '@angular/core';

import { BdTimeAgoPipe } from './time-ago/time-ago.pipe';

@NgModule({
  declarations: [BdTimeAgoPipe],
  exports: [BdTimeAgoPipe]
})
export class BdPipesModule { }
