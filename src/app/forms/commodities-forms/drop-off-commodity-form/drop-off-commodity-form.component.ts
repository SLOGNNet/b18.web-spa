import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';
import { BaseForm } from '../../base-form';

@Component(Object.assign({
  selector: 'drop-off-commodity-form',
  templateUrl: './drop-off-commodity-form.component.html',
  styleUrls: [
    './drop-off-commodity-form.component.scss'
  ]
}, BaseForm.metaData))
export class DropOffCommodityFormComponent extends BaseCommodityFormComponent {
  @Output() select: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @Input() availablePickups: Array<Commodity> = new Array<Commodity>();

  constructor(formBuilder: FormBuilder, cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(formBuilder, cdr, elementRef);
  }

  pickupSelect(commodity: Commodity) {
    this.select.emit(commodity);
  }

  protected createTitles(): Array<{name: string}> {
    const titles = super.createTitles();
    titles.unshift({ name: 'DROPOFF<br />#' });
    return titles;
  }
}
