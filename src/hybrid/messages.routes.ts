import { Routes } from '@angular/router';
import { MessagesComponent } from '../app/drivers/messages'
export const ROUTES: Routes = [
  { path: '', component: MessagesComponent },
  { path: 'messages/:id', component: MessagesComponent },
];
