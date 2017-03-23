import { Injectable } from '@angular/core';

@Injectable()
export class EnumHelperService {
  public getValues(e) {
    return this.getObjectValues(e).filter(function(v) { return typeof v === 'number'; });
  };

  public getNames(e) {
    return this.getObjectValues(e).filter(function(v) { return typeof v === 'string'; });
  };

  public getDropdownKeyValues(e) {
    const keyValues = [];
    const keys = Object.keys(e).filter((el) => !isNaN(parseInt(el, 10)));
    for (let i = 0; i < keys.length; i++) {
        const key =  keys[i];
        // TODO: Remove compatibility with previous version after refactoring
        const value = e.displayText ? e.displayText(key) : e[key];
        keyValues.push({key: parseInt(key, 10), value});
    }
    return keyValues;
  }

  private getObjectValues(e) {
    return Object.keys(e).map(function(k) { return e[k]; });
  };
}
