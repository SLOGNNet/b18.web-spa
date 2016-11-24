import { NgModule } from '@angular/core';

import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';

@NgModule({
    providers: [
        NotificationService,
        SocketService
    ]
})
export class SharedModule {}
