// ngrx
import { createFeatureSelector, createSelector } from '@ngrx/store';

// local
import { adapter, GuestState, GUEST_STATE_NAME } from './guest.state';

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// feature selector
export const selectGuestState = createFeatureSelector<GuestState>(GUEST_STATE_NAME);

// select the array of Guest ids
export const selectGuestIds = createSelector(selectGuestState, selectIds);

// select the dictionary of Guest entities
export const selectGuestEntities = createSelector(selectGuestState, selectEntities);

// select the array of Guests
export const selectAllGuests = createSelector(selectGuestState, selectAll);

// select the total Guest count
export const selectGuestTotal = createSelector(selectGuestState, selectTotal);

// start & end are inclusive
export const isRangeLoaded = createSelector(
  selectGuestState,
  (state: GuestState, { start, end }) =>
    !state.loadedIndices.slice(start, Math.min(state.loadedIndices.length, end + 1)).some((index) => index === undefined)
);

export const gestGuestIndex = createSelector(selectGuestState, (state: GuestState, { guestId }) =>
  state.loadedIndices.indexOf(guestId)
);

// select current logged guest
// TODO change with selectLoggedGuest
export const selectLoggedGuestId = createSelector(selectGuestState, (state: GuestState) => state.loggedGuestId);

export const selectGuestListByIds = createSelector(selectGuestState, (state: GuestState, { ids }: { ids: string[] }) =>
  ids.map((id) => state.entities[id])
);
