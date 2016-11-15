/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { RouterModule } from '@angular/router';
import { ROUTES } from './messages.routes';

import { MessagesComponent } from '../app/drivers/messages'
import { MessageComponent } from '../app/drivers/messages/message'
import { HybridAppFactory } from '../app/app.hybrid.module.factory';

const HybridMessagesModule = HybridAppFactory({
    bootstrapComponents: [MessagesComponent],
    declarations: [MessagesComponent],
    imports: [RouterModule.forRoot(ROUTES)]
})
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(HybridMessagesModule)
    .catch(err => { console.error(err); });
}

bootloader(main);
