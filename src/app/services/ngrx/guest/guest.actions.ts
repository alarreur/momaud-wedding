// ngrx
import { createAction, props } from '@ngrx/store';

// application
import { GuestDto } from '@app/models';

// local

const userTriggerPrefix = '[GUEST][APP EVENT]';
const firebasePrefix = '[GUEST][FIREBASE EVENT]';

export const loadGuestList = createAction(`${userTriggerPrefix} Load Guest List`, props<{ startAt?: number; limit?: number }>());
export const guestAdded = createAction(`${firebasePrefix} Guest added`, props<{ guest: GuestDto; index: number }>());
export const guestModified = createAction(
  `${firebasePrefix} Guest modifed`,
  props<{ guest: GuestDto; oldIndex: number; newIndex: number }>()
);
export const guestRemoved = createAction(`${firebasePrefix} Guest removed`, props<{ guest: GuestDto; index: number }>());
