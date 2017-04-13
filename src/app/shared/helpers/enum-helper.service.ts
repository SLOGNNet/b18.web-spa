import { Injectable } from '@angular/core';

@Injectable()
export class EnumHelperService {
  public getDropdownKeyValues(e) {
    const keyValues = [];
    const keys = Object.keys(e).filter((el) => !isNaN(parseInt(el, 10)));
    for (let i = 0; i < keys.length; i++) {
        const key =  keys[i];
        const value = e.displayText ? e.displayText(key) : e[key];
        keyValues.push({key: parseInt(key, 10), value});
    }

    return keyValues;
  }

  public getValueByKey(e, key): string {
    return e[key];
  }
}
