import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import {  ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

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

  this.messages.push(
    { message: 'test message', username: 'username', type: 'carrier', date: '18:11 21-12-2016',
      img: 'https://peopledotcom.files.wordpress.com/2016/08/obama-1024-6.jpg'},
    { message: 'load #123233', username: 'username', type: 'user', date: '18:15 21-12-2016',
      img: 'https://s-media-cache-ak0.pinimg.com/originals/e1/48/b3/e148b3200bcd954ca641428a148a2c71.jpg'},
    { message: 'have a safe trip', username: 'username', type: 'system', date: '18:25 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'ok received', username: 'username', type: 'user', date: '18:26 21-12-2016',
      img: 'https://s-media-cache-ak0.pinimg.com/originals/e1/48/b3/e148b3200bcd954ca641428a148a2c71.jpg'},
    { message: 'hey there!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'hey there!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'hey there!', username: 'username', type: 'carrier', date: '18:39 21-12-2016',
      img: 'https://peopledotcom.files.wordpress.com/2016/08/obama-1024-6.jpg'},
    { message: 'hey there!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'hey 222!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'hey 67676!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: 'hey t33333e!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
    { message: '2323123!', username: 'username', type: 'system', date: '18:39 21-12-2016',
      img: 'https://qph.ec.quoracdn.net/main-qimg-f6e63c9de812fc2660abad36006414e3?convert_to_webp=true'},
  );
}

    ngOnDestroy() {
         this.messagesSubscribtion.unsubscribe();
         console.log('component destory');
    }

    onScrollUp()  {

     }
    /*onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }
    */
  sendMessage() {
    // this.messageService.create(this.message);
    // this.message = '';
  }
}
