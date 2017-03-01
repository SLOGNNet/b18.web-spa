import { NgModule, ApplicationRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { SharedModule } from './shared/shared.module';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { TopPanelComponent } from './top-panel';
import { BdFormsModule } from './forms/forms.module';
import { NgReduxModule } from 'ng2-redux';
import { AuthModule } from './auth/auth.module';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { DriversComponent, DriverCardsComponent, DriverCardComponent } from './drivers';
import { MultiPaneLayoutComponent } from './multi-pane-layout';
import { HomeComponent } from './home';
import { MessagesComponent } from './drivers/messages';
import { MessageComponent } from './drivers/messages/message';
import { NoContentComponent } from './no-content';
import { MainComponent } from './main/main.component';
import { LoadsComponent,
  LoadDetailComponent,
  LoadStopCardComponent,
  LoadStopCardsComponent,
  TripPopoverComponent,
  CompanyPopoverComponent,
  DriverPopoverComponent } from './loads';
import {
  CommodityActions,
  LoadActions,
  AddressActions,
  CompanyActions,
  EquipmentActions,
  DriverActions,
  StopActions
} from './actions';
import { CompaniesComponent, CompanyDetailComponent } from './companies';
import { CompanyCardComponent } from './companies/components/company-card';
import { CompanyCardsComponent } from './companies/components/company-cards';
import { BdToastManagerComponent } from './bd-toast-manager/bd-toast-manager.component';
import { EquipmentComponent, EquipmentCardComponent, EquipmentCardsComponent } from './equipment';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
     AppComponent,
     MultiPaneLayoutComponent,
     HomeComponent,
     DriversComponent,
     DriverCardsComponent,
     DriverCardComponent,
     NoContentComponent,
     MessagesComponent,
     MessageComponent,
     LoadsComponent,
     LoadDetailComponent,
     CompaniesComponent,
     CompanyDetailComponent,
     CompanyCardComponent,
     CompanyCardsComponent,
     LoadStopCardComponent,
     LoadStopCardsComponent,
     TripPopoverComponent,
     CompanyPopoverComponent,
     DriverPopoverComponent,
     TopPanelComponent,
     BdToastManagerComponent,
     EquipmentComponent,
     EquipmentCardComponent,
     EquipmentCardsComponent,
     MainComponent
  ],
  imports: [
    SharedModule,
    NavigationBarModule,
    BrowserModule,
    BdFormsModule,
    RouterModule.forRoot(ROUTES),
    NgReduxModule,
    AuthModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    CommodityActions,
    LoadActions,
    AddressActions,
    CompanyActions,
    EquipmentActions,
    DriverActions,
    StopActions
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
