import { NgModule, Inject } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { Component, ViewEncapsulation } from '@angular/core';
import { IAppState, rootReducer } from './root-reducer';
export { IAppState } from './root-reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>, @Inject('AppConfig') private config
  ) {
    const isDev = config.env === 'development';
    const middlewares =  isDev ? [reduxImmutableStateInvariant()] : [];
    store.configureStore(
      rootReducer,
      { },
      middlewares);
  }
}
