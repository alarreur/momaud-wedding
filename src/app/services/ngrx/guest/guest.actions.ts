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

export const createGuest = createAction(`${requestActionPrefix} Create Guest`);
export const createGuestSuccess = createAction(`${apiActionPrefix} Guest Created Success`, props<{ user: Guest }>());
export const createGuestFailure = createAction(`${apiActionPrefix} Guest Created Failure`);

export const updateGuest = createAction(`${requestActionPrefix} Update Guest`);
export const updateGuestSuccess = createAction(`${apiActionPrefix} Guest Updated Success`, props<{ update: Update<Guest> }>());
export const updateGuestFailure = createAction(`${apiActionPrefix} Guest Updated Failure`);

export const deleteGuest = createAction(`${requestActionPrefix} Delete Guest`);
export const deleteGuestSuccess = createAction(`${apiActionPrefix} Guest Deleted Success`, props<{ id: string }>());
export const deleteGuestFailure = createAction(`${apiActionPrefix} Guest Deleted Failure`);
