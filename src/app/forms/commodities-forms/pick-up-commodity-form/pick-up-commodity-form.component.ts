import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';
import { BaseForm } from '../../base-form';

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
