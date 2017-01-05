import { Address } from './index';
import { generateNewId } from './utils';


export class Facility {
  id: number;
  address: Address;
  name: string = '';

  static create(): Facility{
    const result = new Facility();
    result.id = generateNewId();
    result.address = Address.create();
    return result;
  }
}
