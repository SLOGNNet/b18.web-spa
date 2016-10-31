import {Injectable} from '@angular/core';
export { IDriverMessage } from './interfaces';
import 'rxjs/add/operator/map';
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { NotificationService } from "../../shared";
@Injectable()
export class MessageService {
    private $messages: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    create(message: string): void {
        this.notificationService.send({
            username: 'test',
            message
        });
    }

    constructor(private notificationService: NotificationService) {
        this.notificationService
            .get()
            .subscribe(
                (notification: any) => {
                    let message = notification.item;
                    this.list = this.list.push(message);
                    this.$messages.next(this.list);
                },
                error => console.log(error)
            );
    }

    getMessages() {
        return this.$messages;
    }
}
