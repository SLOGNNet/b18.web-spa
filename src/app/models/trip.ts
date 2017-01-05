import { Commodity, Address } from './index';
import { generateNewId } from './utils';


export class Trip {
  id: number;
  address: Address;
  driverFullName: string = '';
  truckNumber: number = 0;
  trailerNumber: number = 0;

  static create(): Trip{
    const result = new Trip();
    result.id = generateNewId();
    result.address = Address.create();
    return result;
  }
}
