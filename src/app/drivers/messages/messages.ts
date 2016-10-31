import {Component, Inject, OnInit} from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'messages',
    styleUrls: ['./messages.css'],
    templateUrl: './messages.html'
})
export class MessagesComponent implements OnInit {
  private messages: Array<any> = new Array<any>();;
  constructor(public messageService: MessageService) {
  }
  ngOnInit() {
    this.messageService.getMessages().subscribe(messages => {
        this.messages = messages;
    });
  }
}
