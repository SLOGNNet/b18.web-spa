import { Injectable } from '@angular/core';

@Injectable()
export class EnumHelperService {
  public getValues(e) {
    return this.getObjectValues(e).filter(function(v) { return typeof v === 'number'; });
  };

  public getNames(e) {
    return this.getObjectValues(e).filter(function(v) { return typeof v === 'string'; });
  };

  private getObjectValues(e) {
    return Object.keys(e).map(function(k) { return e[k]; });
  };
}
