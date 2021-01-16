// ngrx
import { GuestDto } from '@app/models';
import { Dictionary } from '@ngrx/entity';
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

export const selectGuestById = (id: string) => createSelector(selectGuestEntities, (state: Dictionary<GuestDto>) => state[id]);
