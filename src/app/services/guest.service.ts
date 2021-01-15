// angular
import { Injectable } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';

// rxjs
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

// angular fire
import { AngularFirestore } from '@angular/fire/firestore';

// app
import { Guest, GuestDto } from '@app/models';

// local
import { selectAllGuests, selectGuestEntities, selectGuestTotal } from './ngrx/guest/guest.selectors';
import * as GuestActions from './ngrx/guest/guest.actions';
import { FIREBASE_COLLECTION_NAME } from './ngrx/guest/guest.state';

@Injectable()
export class GuestService {
  constructor(private readonly _store: Store, private readonly _firestore: AngularFirestore) {}

  public list(): Observable<Guest[]> {
    return this._store.select(selectGuestTotal).pipe(
      first(),
      switchMap((count) => {
        if (count === 0) {
          this._store.dispatch(GuestActions.loadGuestList({}));
        }

        return this._store.select(selectAllGuests).pipe(map((guests) => guests.map((dto) => new Guest(dto))));
      })
    );
  }

  public get(id: string): Observable<Guest> {
    return null;
  }

  public search(): Observable<Guest> {
    return null;
  }

  public create(guest: Guest): Observable<Guest> {
    // TODO create transaction for plusOneId & parentId

    return from(this._firestore.collection<GuestDto>(FIREBASE_COLLECTION_NAME).add(guest.toDto())).pipe(
      switchMap((docRef) => this._store.select(selectGuestEntities, { id: docRef.id })),
      first(),
      map((dto) => new Guest(dto))
    );
  }

  public update(guest: Guest): Observable<Guest> {
    // TODO create transaction for plusOneId & parentId

    const docRef = this._firestore.collection<GuestDto>(FIREBASE_COLLECTION_NAME).doc<GuestDto>(guest.id);

    setTimeout(() => {
      this._firestore.collection<GuestDto>(FIREBASE_COLLECTION_NAME).doc(guest.id).update(guest.toDto());
    }, 0);

    return docRef.snapshotChanges().pipe(
      first(),
      map(
        ({ payload }) =>
          new Guest({
            id: payload.id,
            ...payload.data(),
          })
      )
    );
  }

  public delete(guest: Guest): Observable<void> {
    const docRef = this._firestore.collection<GuestDto>(FIREBASE_COLLECTION_NAME).doc(guest.id);

    return from(docRef.delete());
  }
}
