import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContactInfo, ContactInfoType } from '../../../models';

@Component({
  selector: 'bd-contact-info',
  templateUrl: './bd-contact-info.component.html',
  styleUrls: ['./bd-contact-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdContactInfoComponent {
    @Input() contactCollection: Array<ContactInfo> = [];

    getContactInfoType(type: ContactInfoType) {
        return ContactInfo.getContactInfoType(type);
    }
}
