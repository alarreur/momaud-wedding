// angular
import { Injectable } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

// rxjs
import { Observable, throwError } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

// app
import { doOnSubscribe, Guest, guid } from '@app/models';

// local
import { selectAllGuests } from './ngrx/guest/guest.selectors';
import * as GuestActions from './ngrx/guest/guest.actions';

@Injectable()
export class GuestService {
  constructor(private readonly _store: Store, private _actions$: Actions) {
    // TODO listen to firebase udpates to load/refresh values
    this._store.dispatch(GuestActions.loadGuestList());
  }

  public getAll(): Observable<Guest[]> {
    return this._store.select(selectAllGuests).pipe(map((guests) => guests.map((dto) => new Guest(dto))));
  }

  public getById(): Observable<Guest> {
    return null;
  }

  public search(): Observable<Guest> {
    return null;
  }

  public create(guest: Guest): Observable<Guest> {
    const transactionId = guid();

    setTimeout(() => {
      this._store.dispatch(GuestActions.createGuest({ guest, transactionId }));
    }, 0);

    return this._actions$.pipe(
      ofType(GuestActions.createGuestSuccess, GuestActions.createGuestFailure),
      filter(({ transactionId: tId }) => tId === transactionId),
      first(),
      map((action) => {
        // TODO cast to proper action type
        if (action.type === GuestActions.createGuestSuccess.type) {
          return (<any>action).guest;
        } else {
          throwError((<any>action).error);
        }
      })
    );
  }

  public update(): Observable<Guest> {
    return null;
  }

  public delete(): Observable<boolean> {
    return null;
  }

  // private _createTransactionAction<T>(
  //   actionToDispatch: TypedAction<string> & { transactionId: string },
  //   successAction: ActionCreator<string, () => TypedAction<string> & { transactionId: string }>,
  //   failureAction: ActionCreator<string, () => TypedAction<string> & { transactionId: string }>,
  //   successResultPropGetter: (successAction: ActionCreator<string, () => TypedAction<string> & { transactionId: string }>) => T,
  //   errorResultPropGetter: (failureAction: ActionCreator<string, () => TypedAction<string> & { transactionId: string }>) => string
  // ): Observable<T> {
  //   const transactionId = guid();

  //   const resultAction$ = this._actions$.pipe(
  //     ofType(successAction, failureAction),
  //     filter(({ transactionId: tId }) => tId == transactionId),
  //     first(),
  //     map((action) => {
  //       // TODO cast to proper action type
  //       if (action.type === successAction.type) {
  //         return successResultPropGetter(<any>action);
  //       } else {
  //         throwError(errorResultPropGetter(<any>action));
  //       }
  //     })
  //   );

  //   return concat(EMPTY.pipe(tap(() => this._store.dispatch(GuestActions.createGuest({ guest, transactionId })))), resultAction$);
  // }
}
