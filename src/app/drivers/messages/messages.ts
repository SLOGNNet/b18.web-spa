import {Component, Inject, OnInit} from '@angular/core';
import {MessageService, IDriverMessage} from '../services/message-service';

@Component({
    selector: 'messages',
    styleUrls: ['./messages.css'],
    templateUrl: './messages.html'
})
export class MessagesComponent implements OnInit {
  private messages: Array<IDriverMessage>;
  constructor(public messageService: MessageService) {
  }
  ngOnInit() {
    this.messageService
      .getMessages('anyid')
      .then(messages => this.messages = messages);
  }
}
