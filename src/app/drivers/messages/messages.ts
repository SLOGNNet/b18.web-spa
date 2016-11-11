import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MessageComponent } from './message/message'
import {  ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'messages',
    styleUrls: ['messages.scss'],
    templateUrl: './messages.html',
    inputs: ['message'],
    providers: [MessageService]
  /*
    directives: [MessageComponent]
  */
})
export class MessagesComponent implements OnInit {
  private messages: Array<any> = new Array<any>();

  constructor(public messageService: MessageService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let driverId = params['id'];
      this.messageService.getMessages(driverId).subscribe(messages => {
        this.messages = messages;
      });
    });

    // this.messages.push({ message: "test message", username: "username", type: "carrier"},
    //   { message: "load #123233", username: "username", type: "user"},
    //   { message: "have a safe trip", username: "username", type: "system"},
    //   { message: "ok received", username: "username", type: "user"},
    //   { message: "hey there!", username: "username", type: "system"}
    // )
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage() {
    this.messageService.create(this.message);
    this.message = '';
  }
}
