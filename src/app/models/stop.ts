import { Commodity, Address } from './index';

export enum StopTypes {
  None = 0,
  Pickup = 1,
  Dropoff = 2
};

let dummyId = 10000;
export class Stop {
  id: number;
  address: Address;
  commodities: Array<Commodity>;
  date: string = '';
  notes: string = '';
  type: StopTypes = StopTypes.None;
  static create(type: StopTypes): Stop{
    const result = new Stop();
    dummyId++;
    result.id = dummyId;
    result.type = type;
    result.address = Address.create();
    result.commodities = new Array<Commodity>();
    return result;
  }
}
