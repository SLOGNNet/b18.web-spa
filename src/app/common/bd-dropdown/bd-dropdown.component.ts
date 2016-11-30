import { Component, Input, Output, TemplateRef, EventEmitter, HostBinding, HostListener, forwardRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@Component({
  selector: 'bd-dropdown',
  styleUrls: ['bd-dropdown.component.scss'],
  templateUrl: './bd-dropdown.component.html'
})
export class BdDropdownComponent {

  @Input() dropdownHeaderTemplate: TemplateRef<any>;
  @Input() dropdownFooterTemplate: TemplateRef<any>;
  @Input() dropdownItemTemplate: TemplateRef<any>;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() onFooterClick: EventEmitter<any> = new EventEmitter<any>(false);

  private _items: any[];
  private _selectedValue: any;
  private value: any;

  get currentDisplayText(){
    return this.value ? this.value : 'Select Contact';
  }

  get isSelectedValue(){
    return this.value;
  }

  @Input() set items(args: any[]){
    this._items = args;
  }
  get items(): any[]{
    return this._items;
  }

  @Input() set selectedValue(v: any) {
      if ((<any>Object).values(this.items).includes(v)){
        this._selectedValue = v;
        this.value = this._selectedValue;
      }
  }

  public _handleDropdownHeaderClick(event): void {
    this.value = null;
  }

  public _handleDropdownItemClick(event): void {
    this.value = event.target.getAttribute('value');
    this.onItemClick.emit(this.value);
  }

  public _handleFooterClick(event): void {
    this.onFooterClick.emit(event);
  }

}
