import {Injectable} from '@angular/core';
export { IDriverMessage } from './interfaces';
import 'rxjs/add/operator/map';
import { List } from "immutable";

import { SocketService } from "../../shared";
@Injectable()
export class MessageService {
    create(message: string): void {
        this.socketService.send({
            username: 'test',
            message
        });
    }

    constructor(private socketService: SocketService) {
        console.log('MessageService created');

    }

    getMessagesObservable(driverId: string) {
        let list: List<any> = List();
        const messagesObserver = this.socketService
            .getSocketObservable('/drivers', driverId)
            .map((message: any) => list = list.push(message.item));
        return messagesObserver;
    }

     getMessages(driverId: string){
        return this.getMessagesObservable(driverId);
    }
}
