import { Address } from './address';
import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Facility {
  @JsonMember
  id: number;
  @JsonMember({ elements: Address })
  address: Address;
  @JsonMember
  name: string = '';

  static create(): Facility{
    const result = new Facility();
    result.id = generateNewId();
    result.address = Address.create();
    return result;
  }
}
