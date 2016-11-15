import { Component, Input, HostBinding } from '@angular/core'

@Component({
  selector: 'message',
  styleUrls: ['message.scss'],
  templateUrl: './message.html',
})

 export class MessageComponent {
  @Input () message: string;
  private currentClass:string = "message-";
  private currentClassContainer:string = "container-left";

 ngOnInit(){
       this.currentClass += this.message.type;
       this.currentClassContainer = this.message.type == "system" ? "container-right" : "container-left"
 }

}
