import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ContactInfo, ContactInfoType } from '../../../../../models';

@Component({
  selector: 'contact-info-container',
  templateUrl: './contact-info-container.component.html',
  styleUrls: ['./contact-info-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoContainerComponent {
    @Input() contactCollection: Array<ContactInfo> = [];

    getContactInfoType(type: ContactInfoType) {
        return ContactInfo.getContactInfoType(type);
    }
}
