import { Commodity, Address } from './index';

export enum StopTypes {
  None = 0,
  Pickup = 1,
  Dropoff = 2
};

export class Stop {
  address: Address;
  commodities: Array<Commodity>;
  date: string = '';
  notes: string = '';
  type: StopTypes = StopTypes.None;
  static create(type: StopTypes): Stop{
    const result = new Stop();
    result.type = type;
    result.address = Address.create();
    result.commodities = new Array<Commodity>();
    return result;
  }
}
