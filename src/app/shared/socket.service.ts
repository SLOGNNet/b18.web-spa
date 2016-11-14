import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { URLSearchParams } from '@angular/http'
import { IMessage, ISocketItem } from "../../models";

@Injectable()
export class SocketService {
    private host: string = 'http://localhost:5000';
    private socket: any;

    constructor() {
        console.log('socket service created');
    }

    private createSocket(namespace:string, room: string) {
        const socketUrl = this.host + namespace;
        this.socket = io.connect(socketUrl,  {
          'query': `roomId=${room}`,
          'reconnection': true,
          'reconnectionDelay': 1000,
          'reconnectionAttempts': 10,
          'forceNew': true
        });
        this.socket.on("connect", () => this.connect(namespace, room));
        this.socket.on("disconnect", () => this.disconnect( namespace, room));
        this.socket.on("error", (error: string) => this.error( namespace, room, error));
        return Observable.create((observer: any) => {
            this.socket.on("message", (item: any) => {
                console.log('message received');
                observer.next({ item: item })
            });
            return () => this.socket.close();
        });
    }

    getSocketObservable(namespace:string, room: string): Observable<any> {
        return this.createSocket(namespace, room)
    }

    send(message: any): void {
        this.socket.emit("message", message);
    }

    private connect(namespace:string, room: string) {
        console.log(`Connected to ${namespace} room ${room}`);
    }

    private disconnect(namespace:string, room: string) {
        console.log(`Disconnected from ${namespace} room ${room}`);
    }

    private error(namespace:string, room: string, error: string) {
        console.log(`ERROR: "${error}" on ${namespace} room ${room}`);
    }
}
