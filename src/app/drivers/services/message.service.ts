import {Injectable} from '@angular/core';
export { IDriverMessage } from './interfaces';
import 'rxjs/add/operator/map';
import { ReplaySubject } from "rxjs";
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

    createMessagesObservable(driverId: string) {
        const $messages: ReplaySubject<any> = new ReplaySubject(1);
        let list: List<any> = List();
        this.socketService
            .getSocketObservable('/notifications', driverId)
            .subscribe(
                (notification: any) => {
                    let message = notification.item;
                    list = list.push(message);
                    $messages.next(list);
                },
                error => console.log(error)
            );
        return $messages;
    }

     getMessages(driverId: string){
        return this.createMessagesObservable(driverId);
    }
}
