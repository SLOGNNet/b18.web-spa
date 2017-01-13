import { Commodity, Address, Driver } from './index';
import { generateNewId } from './utils';


export class Trip {
  id: number;
  number: number = 0;
  driverFullName: string = '';
  truckNumber: number = 0;
  trailerNumber: number = 0;
  driver: Driver;

  static create(): Trip{
    const result = new Trip();
    result.id = generateNewId();
    result.driver = Driver.create();
    return result;
  }
}
