export { generateNewId } from '../shared/helpers/data.helper'
import { isNumber } from 'lodash';
interface Enum {
    [id: number]: string;
}

export function toEnumTransformer<Enum>(enumType: Enum) {
    return (value: string | number) => {
      if (isNumber(value)) {
        return value;
      }
      else {
        const parsed  = <Enum> (value && !isNumber(value) ? enumType[value] : 0);
        return parsed;
      }
    };
}

export function fromEnumTransformer<Enum>(enumType: Enum) {
    return (value: string | number) => {
      if (isNumber(value)) {
        const parsed: string = (value === 0) ? null : enumType[value];
        return parsed;
      }
      else {
        return value;
      }
    };
}


