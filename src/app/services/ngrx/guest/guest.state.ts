// ngrx
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// local
import { GuestDto, sortByLastName } from '@app/models';

export const GUEST_STATE_NAME = 'guests';

export const FIREBASE_COLLECTION_NAME: string = 'guests';

export interface GuestState extends EntityState<GuestDto> {
  loggedGuestId: string | null;
  loadedIndices: string[];
}

export const adapter: EntityAdapter<GuestDto> = createEntityAdapter<GuestDto>({
  selectId: (guest) => guest.id,
  sortComparer: sortByLastName,
});
