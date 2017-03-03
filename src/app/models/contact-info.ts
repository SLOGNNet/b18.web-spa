import { Address } from './index';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { ContactInfoType } from './enums';

@JsonObject
export class ContactInfo {
  @JsonMember
  label: string = '';
  @JsonMember
  value: string = '';
  @JsonMember
  type: ContactInfoType;
}
