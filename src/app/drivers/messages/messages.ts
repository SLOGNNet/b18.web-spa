import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MessageComponent } from './message/message'
import {  ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'messages',
    styleUrls: ['messages.scss'],
    templateUrl: './messages.html',
    inputs: ['message'],
    providers: [MessageService]
})
export class MessagesComponent implements OnInit {
    private messages: Array<any> = new Array<any>();
    private messagesSubscribtion: Subscription;
    private message : string;

    constructor(public messageService: MessageService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
          let driverId = params['id'];
          this.messagesSubscribtion = this.messageService
            .getMessages(driverId)
            .subscribe(messages => {
                  this.messages = messages.toArray();
             });
        });

  this.messages.push({ message: "test message", username: "username", type: "carrier", date: "18:07 21-12-2016" },
    { message: "load #123233", username: "username", type: "user", date: "18:15 21-12-2016"},
    { message: "have a safe trip", username: "username", type: "system", date: "18:25 21-12-2016"},
    { message: "ok received", username: "username", type: "user", date: "18:26 21-12-2016"},
    { message: "hey there!", username: "username", type: "system", date: "18:39 21-12-2016"},
  )
}

    ngOnDestroy() {
         this.messagesSubscribtion.unsubscribe();
         console.log('component destory');
    }

    /*onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }
    */
  sendMessage() {
    //this.messageService.create(this.message);
    //this.message = '';
  }
}
