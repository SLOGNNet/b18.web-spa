import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  private _panesWidth = {};

  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  setPanesWidth(switchState, states: Array<number>): void {
    this._panesWidth[switchState] = states;
    sessionStorage.setItem('panesWidth', JSON.stringify(this._panesWidth));
  }

  getPanesWidth(switchState): Array<number> {
    let widths = sessionStorage.getItem('panesWidth');

    if (widths) {
      try {
        this._panesWidth = JSON.parse(widths);
      } catch (e) {
        this._panesWidth = {};
      }
    } else {
      this._panesWidth = {};
    }

    return this._panesWidth[switchState];
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
