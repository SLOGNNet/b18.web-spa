import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { SharedModule } from './shared/shared.module';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { AppState, InternalStateType } from './app.service';
import { DriversComponent } from './drivers';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { HomeComponent } from './home';
import { CommonInputComponent } from './common/bd-input';
import { BdDropdownComponent } from './common/bd-dropdown';
import { BdFormButtonComponent } from './common/bd-form-button';
import { MessagesComponent } from './drivers/messages';
import { MessageComponent } from './drivers/messages/message';
import { NoContentComponent } from './no-content';
import { Angular2DataTableModule } from 'angular2-data-table';
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
  declarations: [
     AppComponent,
     HomeComponent,
     CommonInputComponent,
     BdDropdownComponent,
     BdFormButtonComponent,
     DriversComponent,
     NoContentComponent,
     MessagesComponent,
     MessageComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    SharedModule,
    Angular2DataTableModule,
    DropdownModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
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
