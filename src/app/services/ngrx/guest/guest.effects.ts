// angular
import { Injectable } from '@angular/core';

// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects';

// rxjs
import { map, mergeMap } from 'rxjs/operators';

// angular fire
import { AngularFirestore } from '@angular/fire/firestore';

// app
import { GuestDto } from '@app/models';

// local
import * as GuestActions from './guest.actions';
import { FIREBASE_COLLECTION_NAME } from './guest.state';

// https://medium.com/@michael.warneke/ngrx-get-data-from-firestore-part-1-6f6688946c46

@Injectable()
export class GuestEffects {
  public loadGuestList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GuestActions.loadGuestList),
      mergeMap(({ startAt, limit }) => {
        return this._firestore
          .collection<GuestDto>(FIREBASE_COLLECTION_NAME)
          .stateChanges()
          .pipe(
            mergeMap((actions) => actions),
            map(({ type, payload }) => {
              console.debug(`[GuestEffects] Firebase state change: ${type}`);

              switch (type) {
                case 'added':
                  return GuestActions.guestAdded({
                    guest: {
                      id: payload.doc.id,
                      ...payload.doc.data(),
                    },
                    index: payload.newIndex,
                  });
                case 'modified':
                  return GuestActions.guestModified({
                    guest: {
                      id: payload.doc.id,
                      ...payload.doc.data(),
                    },
                    oldIndex: payload.oldIndex,
                    newIndex: payload.newIndex,
                  });
                case 'removed':
                  return GuestActions.guestRemoved({
                    guest: {
                      id: payload.doc.id,
                      ...payload.doc.data(),
                    },
                    index: payload.newIndex,
                  });
              }
            })
          );
      })
    )
  );

  constructor(private _actions$: Actions, private readonly _firestore: AngularFirestore) {}
}
