import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContactInfo, ContactInfoType } from '../../../models';
import { isEqual } from 'lodash';

@Component({
  selector: 'bd-contact-info',
  templateUrl: './bd-contact-info.component.html',
  styleUrls: ['./bd-contact-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdContactInfoComponent {
  @Input() contactCollection: Array<ContactInfo> = [];

  getContactInfoType(type: ContactInfoType) {
    return ContactInfoType.displayText(type);
  }
  
  isPhone(item: ContactInfoType) {
    return isEqual(item, ContactInfoType.PHONE);
  }

  isFax(item: ContactInfoType) {
    return isEqual(item, ContactInfoType.FAX);
  }

  isEmail(item: ContactInfoType) {
    return isEqual(item, ContactInfoType.EMAIL);
  }

}
