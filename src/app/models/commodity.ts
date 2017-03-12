import { generateNewId } from './utils';
import { Stop } from './stop';
import { StopActionTypes } from './enums';

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

  static create(): Commodity{
    const result = new Commodity();
    result.id = generateNewId();
    return result;
  }
}
