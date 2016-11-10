import { Component, Input } from '@angular/core'

@Component({
  selector: 'message',
  styleUrls: ['message.scss'],
  templateUrl: './message.html',
  /*
  inputs: ['message']
   */
})

 export class MessageComponent {
    @Input () message: string;
              //type : string
}

