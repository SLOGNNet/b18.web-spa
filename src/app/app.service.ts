import { Injectable } from '@angular/core';
import { SwitchState } from './shared/enums/switchState';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  private _panesWidth = {};
  private _panesState = [
    SwitchState.FirstPaneVisible,
    SwitchState.SecondPaneVisible,
    SwitchState.ThirdPaneVisible
  ];
  private _defaultPaneWidths = {
    0: 0,
    1: 100,
    2: 50,
    3: 33.33333333
  };

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

  setPanesWidth(switchState, widths: Array<number>): void {
    this._panesWidth[switchState] = widths;
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
    }

    if (!this._panesWidth[switchState]) {
      this._panesWidth[switchState] = Array(3).fill(this._getDefaultPaneWidths(switchState));
      sessionStorage.setItem('panesWidth', JSON.stringify(this._panesWidth));
    }

    return this._panesWidth[switchState];
  }

  private _getDefaultPaneWidths(state) {
    const columnsCount = this._panesState.filter(value => {
      return !!(value & state);
    }).length;

    return this._defaultPaneWidths[columnsCount];
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
