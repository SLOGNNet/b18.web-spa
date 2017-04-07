import { CommonActions } from './actions';
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else if (handlers.hasOwnProperty(CommonActions.DEFAULT)) {
      return handlers[CommonActions.DEFAULT](state, action);
    }
    else {
      return state;
    }
  };
}
