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
  loadGuests$ = createEffect(() =>
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

  constructor(private _actions$: Actions, private _guestIoService: GuestIoService) {}
}
