/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { IAppState, rootReducer } from './store';
import { NgRedux } from '@angular-redux/store';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent {
  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.configureStore(
      rootReducer, {}, []);
  }
}
