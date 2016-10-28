import {Component, Inject, OnInit} from '@angular/core';
import {MessageService, IDriverMessage} from '../services/message-service';

@Component({
    selector: 'messages',
    styleUrls: ['./messages.css'],
    templateUrl: './messages.html',
    inputs: ['message']
})
export class MessagesComponent implements OnInit {
  private messages: Promise<Array<IDriverMessage>>;
  constructor(public messageService: MessageService) {
  }
  ngOnInit() {
    this.messageService
      .getMessages('anyid')
      .then(messages => this.messages = messages);
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage() {
    this.messageService.insertMessage({
      username : this.username,
      message : this.message
    });
    this.message = '';
  }
}
