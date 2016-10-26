import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IDriverMessage} from './interfaces';

export {IDriverMessage} from './interfaces';

@Injectable()
export class MessageService {
  constructor() {}
  getMessages(driverId: string): Promise<Array<IDriverMessage>> {
      const messages = new Array<IDriverMessage>();
      for(let i = 0; i < 10; i++) {
          messages.push({message: 'message' + i, username: 'username' + i});
      }

      return new Promise((resolve) => resolve(messages));
  }
}
