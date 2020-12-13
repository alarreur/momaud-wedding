// ngrx
import { Action, createReducer, on } from '@ngrx/store';

// local
import * as GuestActions from './guest.actions';
import { adapter, GuestState } from './guest.state';

const guestReducer = createReducer(
  adapter.getInitialState({
    loggedGuestId: null,
  }),
  on(GuestActions.loadGuestListSuccess, (state, { guests }) => {
    return adapter.setAll(guests, state);
  }),
  on(GuestActions.loadGuestSuccess, (state, { guest }) => {
    return adapter.setOne(guest, state);
  }),
  on(GuestActions.createGuestSuccess, (state, { guest }) => {
    return adapter.addOne(guest, state);
  }),
  on(GuestActions.updateGuestSuccess, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(GuestActions.deleteGuestSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

export function reducer(state: GuestState | undefined, action: Action) {
  return guestReducer(state, action);
}
