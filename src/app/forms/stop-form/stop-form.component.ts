import { Component, Input, ElementRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Stop } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'stop-form',
  templateUrl: './stop-form.component.html',
  styleUrls: ['./stop-form.component.scss']
}, BaseForm.metaData))
export class StopFormComponent extends BaseForm {
  @Input() disabled: boolean = false;
  @Input()
  public stop: Stop;
  @Input('group')
  public stopForm: FormGroup = this.formBuilder.group({});

  private fields = [
    { name: 'id', validators: [] },
  ];

  constructor(
    private formBuilder: FormBuilder, elementRef: ElementRef){
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
   this.stopForm = this.formBuilder.group({
      id: [this.stop.id],
      stopActions: this.formBuilder.array([]),
    });
  }
}
