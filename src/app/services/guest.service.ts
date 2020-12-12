// angular
import { Injectable } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// app
import { Guest } from '@app/models';

// local
import { selectAllGuests } from './ngrx/guest/guest.selectors';
import * as GuestActions from './ngrx/guest/guest.actions';

@Injectable()
export class GuestService {
  constructor(private readonly _store: Store) {
    this._store.dispatch(GuestActions.loadGuestList());
  }

  public getAll(): Observable<Guest[]> {
    return this._store.select(selectAllGuests).pipe(tap((guests) => console.log(guests)));
  }

  public getById(): Observable<Guest> {
    return null;
  }

  public search(searchTem: string): Observable<Guest> {
    return null;
  }

  public update(guest: Guest): Observable<Guest> {
    return null;
  }

  public delete(guestId: string): Observable<boolean> {
    return null;
  }
}
