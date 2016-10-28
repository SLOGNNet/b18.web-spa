/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { MessagesComponent } from '../app/drivers/messages'
import { HomeComponent } from '../app/home'
import { MessageService } from '../app/drivers/services/message-service'

import { HybridAppFactory } from '../app/app.hybrid.module.factory';

const HybridMessagesModule = HybridAppFactory({
    bootstrapComponents: [MessagesComponent],
    declarations: [MessagesComponent],
    providers: [MessageService]
})
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(HybridMessagesModule)
    .catch(err => { console.error(err); });
}

bootloader(main);
