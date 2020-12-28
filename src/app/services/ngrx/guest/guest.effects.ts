// angular
import { Injectable } from '@angular/core';

// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects';

// rxjs
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

// local
import { GuestIoService } from '../../guest-io.service';
import * as GuestActions from './guest.actions';

@Injectable()
export class GuestEffects {
  public loadGuests$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GuestActions.loadGuestList),
      mergeMap(() =>
        this._guestIoService.list().pipe(
          map(
            (guests) => GuestActions.loadGuestListSuccess({ guests }),
            catchError((error) => of(GuestActions.loadGuestListFailure({ error })))
          )
        )
      )
    )
  );

  public createGuest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GuestActions.createGuest),
      mergeMap(({ guest, transactionId }) =>
        this._guestIoService.create(guest).pipe(
          map(
            (guestWithId) => GuestActions.createGuestSuccess({ guest: guestWithId, transactionId }),
            catchError((error) => of(GuestActions.createGuestFailure({ error, transactionId })))
          )
        )
      )
    )
  );

  public updateGuest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GuestActions.updateGuest),
      mergeMap(({ guests, transactionId }) =>
        this._guestIoService.update(guests).pipe(
          map(
            (updatedGuests) => GuestActions.updateGuestSuccess({ guests: updatedGuests, transactionId }),
            catchError((error) => of(GuestActions.updateGuestFailure({ error, transactionId })))
          )
        )
      )
    )
  );

  public deleteGuest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GuestActions.deleteGuest),
      mergeMap(({ guestIds, transactionId }) =>
        this._guestIoService.delete(guestIds).pipe(
          map(
            (success) =>
              success
                ? GuestActions.deleteGuestSuccess({ guestIds, transactionId })
                : GuestActions.deleteGuestFailure({ error: `API did not allow deletion`, transactionId }),
            catchError((error) => of(GuestActions.deleteGuestFailure({ error, transactionId })))
          )
        )
      )
    )
  );

  constructor(private _actions$: Actions, private _guestIoService: GuestIoService) {}
}
