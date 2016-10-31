import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { IMessage, ISocketItem } from "../../models";

@Injectable()
export class NotificationService {
    private host: string = 'http://localhost:5000';
    private notificationObservable: Observable<any>;
    private socket: any;


    private createObservable() {
        let socketUrl = this.host + '/notifications';
        this.socket = io.connect(socketUrl, {
          'reconnection': true,
          'reconnectionDelay': 1000,
          'reconnectionAttempts': 10
        });
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        return Observable.create((observer: any) => {
            this.socket.on("notification", (item: any) => {
                console.log('notification received');
                observer.next({ item: item })
            });
            return () => this.socket.close();
        });

    }

    get(): Observable<any> {
        if(!this.notificationObservable) {
            this.notificationObservable = this.createObservable();
        };
        return this.notificationObservable;
    }

    send(message): any {
        this.socket.emit("notification", message);
    }

    private connect() {
        console.log(`Connected to notifications`);
    }

    private disconnect() {
        console.log(`Disconnected from notifications`);
    }
}
