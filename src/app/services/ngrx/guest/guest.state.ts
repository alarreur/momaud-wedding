// ngrx
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// local
import { Guest } from '@app/models';
import { createFeatureSelector } from '@ngrx/store';

export const GUEST_STATE_NAME = 'guests';

export interface GuestState extends EntityState<Guest> {
  loggedGuestId: string | null;
}

export const adapter: EntityAdapter<Guest> = createEntityAdapter<Guest>({
  selectId: (guest) => guest.id,
  sortComparer: Guest.sortByLastName,
});
