import { generateNewId } from './utils';
import { Stop } from './index';

export class Commodity {
  id: number;
  pickupId: number;
  dropoffId?: number;
  pickupNumber: number;
  dropoffNumber: number;
  po: string = '';
  commodity: string = '';
  unitType: string = '';
  unitCount: number;
  palletCount: number;
  weight: number;

  static create(pickup: Stop): Commodity{
    const result = new Commodity();
    result.id = generateNewId();
    result.pickupId = pickup.id;
    return result;
  }
}
