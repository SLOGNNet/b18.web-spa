import { Component, Input } from '@angular/core';

@Component({
  selector: 'address-item-template',
  templateUrl: './address-item-template.html',
  styleUrls: ['./address-item-template.scss']
})

export class AddressItemTemplate {
    @Input() public item: Object;
    constructor() {
    }
}
