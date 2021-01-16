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
import { selectAllGuests, selectGuestById, selectGuestTotal } from './ngrx/guest/guest.selectors';
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

  public get(): Observable<Guest> {
    return null;
  }

  public search(): Observable<Guest> {
    return null;
  }

  public create(guest: Guest): Observable<Guest> {
    const guestsRef = this._firestore.firestore.collection(FIREBASE_COLLECTION_NAME);

    return from(
      this._firestore.firestore.runTransaction((transaction) => {
        const createGuestRef = guestsRef.doc();
        const id = createGuestRef.id;

        return this.getPropertyRelatives(transaction, guestsRef, { ...guest, id }, 'plusOneId')
          .pipe(
            map((plusOneRelative) => {
              // create guest
              transaction.set(createGuestRef, guest.toDto());

              if (plusOneRelative) {
                const { directRelative: directPlusOne, indirectRelative: indirectPlusOne } = plusOneRelative;

                if (directPlusOne) {
                  // set plusOneId with new guest id
                  transaction.update(directPlusOne.ref, { plusOneId: createGuestRef.id });
                }

                if (indirectPlusOne) {
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
        console.error(`Error while running "create" transaction`, error);
        throw Error(`Error while running "create" transaction`);
      }),
      switchMap((id) => this._store.select(selectGuestById(id))),
      filter((dto) => !!dto),
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
