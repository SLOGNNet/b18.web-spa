import { Component, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseCommodityFormComponent } from '../base-commodity-form';

@Component(Object.assign({
  selector: 'pick-up-commodity-form',
  templateUrl: './pick-up-commodity-form.component.html',
  styleUrls: [
    './pick-up-commodity-form.component.scss'
  ]
}, BaseCommodityFormComponent.metaData))
export class PickUpCommodityFormComponent extends BaseCommodityFormComponent {
  protected createTitles(): Array<{name: string}> {
    const titles = super.createTitles();
    titles.unshift({ name: 'PICKUP<br />#' });
    return titles;
  }

  constructor(formBuilder: FormBuilder, cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(formBuilder, cdr, elementRef);
  }
}
