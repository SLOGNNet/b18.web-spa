import { NgModule, ApplicationRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { SharedModule } from './shared/shared.module';
import { BdFormsModule } from './forms/forms.module';
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
import { LayoutSwitchComponent } from './layout-switch';
import { NavigationBarComponent } from './navigation-bar';
import { MenuItemComponent } from './navigation-bar/components/menu-item';
import { MultiSlotLayoutComponent } from './multi-slot-layout';
import { HomeComponent } from './home';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { MessagesComponent } from './drivers/messages';
import { MessageComponent } from './drivers/messages/message';
import { NoContentComponent } from './no-content';
import { LoadsComponent } from './loads';
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
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
     AppComponent,
     LayoutSwitchComponent,
     MenuItemComponent,
     NavigationBarComponent,
     MultiSlotLayoutComponent,
     HomeComponent,
     DriversComponent,
     NoContentComponent,
     MessagesComponent,
     MessageComponent,
     LoadsComponent,
     TypeaheadDemoComponent
  ],
  imports: [ // import Angular's modules
    SharedModule,
    BrowserModule,
    InfiniteScrollModule,
    BdFormsModule,
    HttpModule,
    Angular2DataTableModule,
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
