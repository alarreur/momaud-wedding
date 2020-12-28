// ngrx
import { Action, createReducer, on } from '@ngrx/store';
import { Update } from '@ngrx/entity';

// app
import { Guest } from '@app/models';

// local
import * as GuestActions from './guest.actions';
import { adapter, GuestState } from './guest.state';
import { flatMap } from 'lodash';

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
    // link plusOnes
    const plusOneOrig = guest.plusOneId && state.entities[guest.plusOneId];
    const plusOneUpdated = plusOneOrig && new Guest({ ...plusOneOrig, plusOneId: guest.id });

    //unlink plusOne's plusOne
    const plusOnePlusOneOrig = plusOneOrig && state.entities[plusOneOrig.plusOneId];
    const plusOnePlusOneUpdated = plusOnePlusOneOrig && new Guest({ ...plusOnePlusOneOrig, plusOneId: undefined });

    const upsertEntities = [guest, plusOneUpdated, plusOnePlusOneUpdated].filter((e) => !!e);

    return adapter.upsertMany(upsertEntities, state);
  }),
  on(GuestActions.updateGuestSuccess, (state, { guests }) => {
    const plusOnesToUpdate = [];

    guests.forEach((guest) => {
      const origPlusOneId = state.entities[guest.id].plusOneId;
      const newPlusOneId = guest.plusOneId;

      if (origPlusOneId && !newPlusOneId) {
        // delete plusOne link.
        const plusOne = state.entities[origPlusOneId];
        if (!guests.some((g) => g.id === plusOne.id)) {
          plusOnesToUpdate.push(new Guest({ ...plusOne, plusOneId: undefined }));
        }
      } else if (origPlusOneId !== newPlusOneId) {
        // create or update plusOne link
        const plusOne = state.entities[newPlusOneId];

        if (!guests.some((g) => g.id === plusOne.id)) {
          plusOnesToUpdate.push(new Guest({ ...plusOne, plusOneId: guest.id }));
        }

        // delete plusOne's plusOne link
        const plusOnePlusOne = plusOne.plusOneId && state.entities[plusOne.plusOneId];
        if (plusOnePlusOne && !guests.some((g) => g.id === plusOnePlusOne.id)) {
          plusOnesToUpdate.push(new Guest({ ...plusOnePlusOne, plusOneId: undefined }));
        }
      }
    });

    const updatesOrig: Update<Guest>[] = guests.concat(plusOnesToUpdate).map((guest) => ({
      id: guest.id,
      changes: guest,
    }));

    return adapter.updateMany(updatesOrig, state);
  }),
  on(GuestActions.deleteGuestSuccess, (state, { guestIds }) => {
    const plusOnesToUpdate = guestIds
      .map((id) => state.entities[id])
      .filter((guest) => guest.plusOneId && !guestIds.some((id) => guest.plusOneId === id))
      .map((guest) => {
        const plusOne = state.entities[guest.plusOneId];

        return new Guest({ ...plusOne, plusOneId: undefined });
      });

    const childrenToUpdate = flatMap(
      guestIds.map((id) => state.entities[id]),
      (parent) =>
        Object.values(state.entities).filter((guest) => guest.parentId === parent.id && !guestIds.some((id) => id === guest.id))
    ).map((guest) => new Guest({ ...guest, parentId: undefined }));

    return adapter.removeMany(guestIds, adapter.upsertMany([...plusOnesToUpdate, ...childrenToUpdate], state));
  })
);

export function reducer(state: GuestState | undefined, action: Action) {
  return guestReducer(state, action);
}
