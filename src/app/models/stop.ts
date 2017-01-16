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
  private static stopStatusText = ['Pending', 'In progress', 'Complete', 'Problem'];
  private static stopTypeText = ['None', 'Pickup', 'Dropoff'];

  id: number;
  address: Address;
  commodities: Array<Commodity>;
  date: Date = null;
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

  public static getStatusText(status): string {
    return Stop.stopStatusText[status];
  }

  public static getTypeText(type): string {
    return Stop.stopTypeText[type];
  }

}
