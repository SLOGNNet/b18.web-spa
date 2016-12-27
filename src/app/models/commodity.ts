export class Commodity {
  id: number;
  pickupId: number;
  dropoffId?: number;
  pickupNumber: number = 0;
  dropoffNumber: number;
  po: string = '';
  commodity: string = '';
  unitType: string = '';
  unitCount: number = 0;
  palletCount: number = 0;
  weight: number = 0;
}
