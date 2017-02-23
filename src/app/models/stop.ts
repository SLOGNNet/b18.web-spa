import { Address } from './address';
import { Facility } from './facility';
import { generateNewId } from './utils';
import { StopTypes, StopStatuses } from './enums';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Stop {
  private static stopStatusColor = ['#75b3e1', '#85d183', '#ffbe4d', '#fb3a3a'];
  private static stopStatusText = ['Pending', 'In progress', 'Complete', 'Problem'];
  private static stopTypeText = ['None', 'Pickup', 'Dropoff'];

  @JsonMember
  id: number;
  @JsonMember({ elements: Address })
  address: Address;
  @JsonMember
  date: Date = null;
  @JsonMember
  notes: string = '';
  @JsonMember
  type: StopTypes = StopTypes.None;
  @JsonMember({ elements: Facility })
  facility: Facility;
  @JsonMember
  status: StopStatuses.InProgress;

  static create(type: StopTypes): Stop{
    const result = new Stop();
    result.id = generateNewId();
    result.date = new Date();
    result.type = type;
    result.address = Address.create();
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
