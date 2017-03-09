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
  @Input() viewMode: ViewMode = ViewMode.View;
  @Input() isNameFieldVisible: boolean = true;
  @Input() location: Location;
  @Input('group') locationForm: FormGroup;
  @Output() update = new EventEmitter();
  @Output() updatePlace = new EventEmitter();

  constructor(private formBuilder: FormBuilder,  elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.locationForm.addControl('id', this.formBuilder.group({
      id: [this.location.id]
    }));
    this.locationForm.addControl('address', this.formBuilder.group({ }));
    this.locationForm.addControl('contactInfo', this.formBuilder.array([]));
  }

  onUpdatePlace(data: any) {
    this.updatePlace.emit({ location: this.location, placeId: data.placeId});
  }
}
