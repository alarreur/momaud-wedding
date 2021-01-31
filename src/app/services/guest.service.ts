// angular
import { Injectable } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';

// rxjs
import { from, Observable, of } from 'rxjs';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';

// angular fire
import { AngularFirestore } from '@angular/fire/firestore';

// app
import { Guest, GuestDto } from '@app/models';

// local
import { isGuestLoaded, selectAllGuests, selectGuestById, selectGuestTotal } from './ngrx/guest/guest.selectors';
import * as GuestActions from './ngrx/guest/guest.actions';
import { FIREBASE_COLLECTION_NAME } from './ngrx/guest/guest.state';
import firebase from 'firebase';

type Transaction = firebase.firestore.Transaction;
type CollectionReference = firebase.firestore.CollectionReference;
type DocumentReference = firebase.firestore.DocumentReference;

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
    return this._store.select(isGuestLoaded(id)).pipe(
      switchMap((loaded) => {
        if (!loaded) {
          this._store.dispatch(GuestActions.loadGuestList({}));
        }

        return this._store.select(selectGuestById(id)).pipe(
          filter((dto) => !!dto),
          map((dto) => new Guest(dto))
        );
      })
    );
  }

  public search(searchTerm: string): Observable<Guest[]> {
    return this.list().pipe(
      filter((guests) => guests && guests.length > 0),
      map((guests) => guests.filter((guest) => guest.isSearchCandidate(searchTerm)))
    );
  }

  public create(guest: Guest): Observable<Guest> {
    return this.upsert(guest);
  }

  public update(guest: Guest): Observable<Guest> {
    return this.upsert(guest);
  }

  public delete(guest: Guest): Observable<void> {
    const guestsRef = this._firestore.firestore.collection(FIREBASE_COLLECTION_NAME);

    return from(
      this._firestore.firestore.runTransaction((transaction) => {
        const deleteGuestRef = guestsRef.doc(guest.id);

        return this.getPropertyRelatives(transaction, guestsRef, guest, 'plusOneId')
          .pipe(
            map((plusOneRelative) => {
              // upsert guest
              transaction.delete(deleteGuestRef);

              if (plusOneRelative) {
                const { directRelative: directPlusOne } = plusOneRelative;

                if (directPlusOne) {
                  // remove link with plusOne
                  transaction.update(directPlusOne.ref, { plusOneId: null });
                }
              }
            })
          )
          .toPromise();
      })
    ).pipe(
      catchError((error) => {
        console.error(`Error while running "delete" transaction`, error);
        throw Error(`Error while running "delete" transaction`);
      })
    );
  }

  private upsert(guest: Guest): Observable<Guest> {
    const guestsRef = this._firestore.firestore.collection(FIREBASE_COLLECTION_NAME);

    return from(
      this._firestore.firestore.runTransaction((transaction) => {
        const upsertGuestRef = guest.id ? guestsRef.doc(guest.id) : guestsRef.doc();
        const id = upsertGuestRef.id;

        return this.getPropertyRelatives(transaction, guestsRef, { ...guest, id }, 'plusOneId')
          .pipe(
            map((plusOneRelative) => {
              // upsert guest
              transaction.set(upsertGuestRef, guest.toDto());

              if (plusOneRelative) {
                const { directRelative: directPlusOne, indirectRelative: indirectPlusOne } = plusOneRelative;

                if (directPlusOne) {
                  // set plusOneId with new guest id
                  transaction.update(directPlusOne.ref, { plusOneId: upsertGuestRef.id });
                }

                if (indirectPlusOne && indirectPlusOne.dto.id !== id) {
                  // remove link with previous relative
                  transaction.update(indirectPlusOne.ref, { plusOneId: null });
                }
              }

              return id;
            })
          )
          .toPromise();
      })
    ).pipe(
      catchError((error) => {
        console.error(`Error while running "upsert" transaction`, error);
        throw Error(`Error while running "upsert" transaction`);
      }),
      switchMap((id) => this._store.select(selectGuestById(id))),
      filter((dto) => !!dto),
      first(),
      map((dto) => new Guest(dto))
    );
  }

  /**
   * Gets the plusOne or parent (called relatives) of a guest.
   * @param  {Transaction} transaction
   * @param  {CollectionReference} collectionRef
   * @param  {GuestDto} guest The guest for which to fetch the relatives
   * @param  {string} propertyForRelativeFetch The property for the relative fetch. Possible values are 'plusOneId'.
   * @param  {boolean=true} fetchIndirectRelative Indicates whether to fetch the relative's relative as well.
   * @returns The direct relative with its indirect relative (ie the relative's relative).
   */
  private getPropertyRelatives(
    transaction: Transaction,
    collectionRef: CollectionReference,
    guest: GuestDto,
    propertyForRelativeFetch: keyof Pick<GuestDto, 'plusOneId'>,
    fetchIndirectRelative: boolean = true
  ): Observable<{
    directRelative: { ref: DocumentReference; dto: GuestDto };
    indirectRelative?: { ref: DocumentReference; dto: GuestDto };
  }> {
    if (!guest[propertyForRelativeFetch]) {
      return of(null);
    } else {
      let directRelativeRef = collectionRef.doc(guest[propertyForRelativeFetch]);

      return from(transaction.get(directRelativeRef)).pipe(
        switchMap((directRelativeSnapshot) => {
          let directRelativeDto = <GuestDto>{ id: directRelativeSnapshot.id, ...directRelativeSnapshot.data() };

          const directRelative = {
            ref: directRelativeRef,
            dto: directRelativeDto,
          };

          if (fetchIndirectRelative && directRelativeDto[propertyForRelativeFetch]) {
            return this.getPropertyRelatives(transaction, collectionRef, directRelativeDto, propertyForRelativeFetch, false).pipe(
              map(({ directRelative: indirectRelative }) => ({
                directRelative,
                indirectRelative,
              }))
            );
          } else {
            return of({
              directRelative,
            });
          }
        })
      );
    }
  }
}
