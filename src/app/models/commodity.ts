import { generateNewId } from './utils';

export class Commodity {
  id: string = '';
  pickupId: string;
  dropoffId?: string;
  pickupNumber: number;
  dropoffNumber: number;
  po: string = '';
  commodity: string = '';
  unitType: string = '';
  unitCount: number;
  palletCount: number;
  weight: number;

  static create(): Commodity{
    const result = new Commodity();
    result.id = generateNewId();
    return result;
  }
}
