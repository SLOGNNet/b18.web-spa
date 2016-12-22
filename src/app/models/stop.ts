import { Commodity, Address } from './index';

export class Stop {
  address: Address;
  commodities: Array<Commodity>;
  date: string = '';
  notes: string = '';

  static create(): Stop{
    const result = new Stop();
    result.address = Address.create();
    result.commodities = new Array<Commodity>();
    return result;
  }
}
