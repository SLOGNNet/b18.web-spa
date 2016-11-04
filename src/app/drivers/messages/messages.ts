import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MessageComponent } from './message/message'

@Component({
    selector: 'messages',
    styleUrls: ['messages.scss'],
    templateUrl: './messages.html',
    inputs: ['message'],
  /*
    directives: [MessageComponent]
  */
})
export class MessagesComponent implements OnInit {
  private messages: Array<any> = new Array<any>();

  constructor(public messageService: MessageService) {
  }
  ngOnInit() {

   /* this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
   */
    this.messages.push({ message: "test message", username: "username"},
      { message: "load #123233", username: "username"}, { message: "ok received", username: "username"})
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
