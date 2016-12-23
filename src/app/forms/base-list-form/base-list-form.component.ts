import { Input, Output } from '@angular/core';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

export abstract class BaseListForm<T> extends BaseForm {
  public static metaData: Object = BaseForm.metaData;

  @Input()
  public items: Array<T>;
  @Input()
  public formArray: FormArray;
  private renderFormData: Array<any> = new Array<any>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnChanges(changes: any) {
    if (changes.items) {
      this.initForm();
    }
  }

  protected initForm() {
    this.resetData();

    for (let item of this.items) {
      this.addFormData(item);
    }

    if (this.items.length === 0) {
      this.addNewItem();
    }
  }

  protected addNewItem() {
    this.addItem(this.createItem());
  }

  protected addItem(item: T) {
      this.addFormData(item);
  }
  
  protected removeItem(removeData) {
    this.renderFormData = this.renderFormData.filter(data => data !== removeData);
  }

  protected abstract createItem(): T;

  private addFormData(item: any): void {
    const group = this.formBuilder.group({});
    this.renderFormData.push({ group, item });
    this.formArray.push(group);
  }

  private resetData() {
    this.renderFormData = new Array<any>();
    this.formArray.reset([]);
  }
}
