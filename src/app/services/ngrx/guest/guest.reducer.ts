// ngrx
import { Action, createReducer, on } from '@ngrx/store';

// local
import * as GuestActions from './guest.actions';
import { adapter, GuestState } from './guest.state';

const guestReducer = createReducer(
  adapter.getInitialState(<GuestState>{
    loggedGuestId: null,
    loadedIndices: [],
  }),
  on(GuestActions.guestAdded, (state, { guest, index }) => {
    const newIndices = state.loadedIndices.slice();
    newIndices[index] = guest.id;

    const newState = { ...state, loaddedIndices: newIndices };

    return adapter.addOne<GuestState>(guest, newState);
  }),
  on(GuestActions.guestModified, (state, { guest, oldIndex, newIndex }) => {
    let newState = null;

    if (oldIndex !== newIndex) {
      const newIndices = state.loadedIndices.slice();
      newIndices[oldIndex] = undefined;
      newIndices[newIndex] = guest.id;

      newState = { ...state, loaddedIndices: newIndices };
    }

    return adapter.updateOne<GuestState>(
      {
        id: guest.id,
        changes: guest,
      },
      newState ? newState : state
    );
  }),
  on(GuestActions.guestRemoved, (state, { guest, index }) => {
    const newIndices = state.loadedIndices.slice();
    newIndices[index] = undefined;

    const newState = { ...state, loaddedIndices: newIndices };

    return adapter.removeOne<GuestState>(guest.id, newState);
  })
);

export function reducer(state: GuestState | undefined, action: Action) {
  return guestReducer(state, action);
}
