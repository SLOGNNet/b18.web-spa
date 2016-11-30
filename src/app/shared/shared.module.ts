import { NgModule } from '@angular/core';

import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { CustomerService } from './customer.service';

@NgModule({
    providers: [
        NotificationService,
        SocketService,
        CustomerService
    ]
})
export class SharedModule {}
