import { Driver } from './driver';
import { generateNewId } from './utils';

import { Type } from 'class-transformer';

export class DriverTeam {
  id: string = '';
  @Type(() => Driver)
  drivers: Array<Driver>;

  static create(): DriverTeam {
    const result = new DriverTeam();
    result.id = generateNewId();
    return result;
  }
};
