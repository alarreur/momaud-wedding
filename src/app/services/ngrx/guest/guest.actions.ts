// ngrx
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

// application
import { Guest } from '@app/models';

// local

const requestActionPrefix = '[GUEST]';
const apiActionPrefix = '[GUEST API]';

export const loadGuestList = createAction(`${requestActionPrefix} Load Guest List`);
export const loadGuestListSuccess = createAction(`${apiActionPrefix} Guest List Loaded Success`, props<{ guests: Guest[] }>());
export const loadGuestListFailure = createAction(`${apiActionPrefix} Guest List Loaded Failure`, props<{ error: any }>());

export const loadGuest = createAction(`${requestActionPrefix} Load Guest`);
export const loadGuestSuccess = createAction(`${apiActionPrefix} Guest Loaded Success`, props<{ guest: Guest }>());
export const loadGuestFailure = createAction(`${apiActionPrefix} Guest Loaded Failure`);

export const createGuest = createAction(`${requestActionPrefix} Create Guest`, props<{ guest: Guest; transactionId?: string }>());
export const createGuestSuccess = createAction(
  `${apiActionPrefix} Guest Created Success`,
  props<{ guest: Guest; transactionId?: string }>()
);
export const createGuestFailure = createAction(
  `${apiActionPrefix} Guest Created Failure`,
  props<{ error: any; transactionId?: string }>()
);

export const updateGuest = createAction(`${requestActionPrefix} Update Guest`, props<{ guest: Guest; transactionId?: string }>());
export const updateGuestSuccess = createAction(
  `${apiActionPrefix} Guest Updated Success`,
  props<{ guest: Guest; transactionId?: string }>()
);
export const updateGuestFailure = createAction(
  `${apiActionPrefix} Guest Updated Failure`,
  props<{ error: any; transactionId?: string }>()
);

export const deleteGuest = createAction(
  `${requestActionPrefix} Delete Guest`,
  props<{ guestId: string; transactionId?: string }>()
);
export const deleteGuestSuccess = createAction(
  `${apiActionPrefix} Guest Deleted Success`,
  props<{ guestId: string; transactionId?: string }>()
);
export const deleteGuestFailure = createAction(
  `${apiActionPrefix} Guest Deleted Failure`,
  props<{ error: any; transactionId?: string }>()
);
