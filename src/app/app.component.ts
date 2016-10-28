/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `<nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./drivers'] ">
          Drivers
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>`
})
export class AppComponent {
  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
