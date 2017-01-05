import { Commodity, Address, Facility } from './index';
import { generateNewId } from './utils';

export enum StopTypes {
  None = 0,
  Pickup = 1,
  Dropoff = 2
};

export enum StopStatuses {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Problem = 3
};

export class Stop {
  private static stopStatusColor = ['#75b3e1', '#85d183', '#ffbe4d', '#fb3a3a'];

  id: number;
  address: Address;
  commodities: Array<Commodity>;
  date: string = '';
  notes: string = '';
  type: StopTypes = StopTypes.None;
  facility: Facility;
  status: StopStatuses.InProgress;

  static create(type: StopTypes): Stop{
    const result = new Stop();
    result.id = generateNewId();
    result.type = type;
    result.address = Address.create();
    result.commodities = new Array<Commodity>();
    result.facility = Facility.create();
    return result;
  }

  public static getStatusColor(status): string {
    return Stop.stopStatusColor[status];
  }

}
