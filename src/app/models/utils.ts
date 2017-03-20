export { generateNewId } from '../shared/helpers/data.helper'

export declare type ClassType<T> = {
    new (...args: any[]): T;
};

export function enumTransformer<T>(cls: ClassType<T>) {
    return (value) => {
      const result: T = <T> (value ? cls[value] : 0);
      return result;
    };
}

