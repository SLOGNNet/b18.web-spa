import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { DriversComponent } from '../drivers';
import { MessagesComponent } from '../drivers/messages';
import { HomeComponent } from '../home';
import { LoadsComponent, LoadDetailComponent } from '../loads';
import { CompaniesComponent, CompanyDetailComponent } from '../companies';
import { EquipmentComponent } from '../equipment';

export const MAIN_ROUTES: Routes = [
  { path: '', redirectTo: 'loads', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'drivers/:id/messages', component: MessagesComponent },
  {
    path: 'loads', component: LoadsComponent, children: [{
      path: ':id',
      component: LoadDetailComponent
    }]
  },
  {
    path: 'companies', component: CompaniesComponent, children: [{
      path: ':id',
      component: CompanyDetailComponent
    }]
  },
  { path: 'equipment', component: EquipmentComponent }
];
