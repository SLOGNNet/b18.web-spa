import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '../../models';
import { ViewMode } from '../../shared/enums';
import { GoogleService } from '../../shared';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
}, BaseForm.metaData))
export class LocationForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() viewMode: ViewMode = ViewMode.View;
  @Input() location: Location;
  @Input('group') locationForm: FormGroup;
  @Output() update = new EventEmitter();

  constructor(private formBuilder: FormBuilder,  elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.locationForm.addControl('id', this.formBuilder.control(
      this.location.id, []
    ));
    this.locationForm.addControl('name', this.formBuilder.control(
      this.location.name, []
    ));
    this.locationForm.addControl('address', this.formBuilder.group({ }));
    this.locationForm.addControl('contactInfo', this.formBuilder.array([]));

    this.locationForm.valueChanges.subscribe((value) => {
      if (this.locationForm.valid && this.locationForm.dirty) {
        this.update.emit(value);
      }
    });
  }
}
