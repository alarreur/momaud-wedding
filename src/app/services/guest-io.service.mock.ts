// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// lodash
import { findIndex, remove } from 'lodash';

// app
import { Guest, guid } from '@app/models';
import { delay } from 'rxjs/operators';
import { newArray } from '@angular/compiler/src/util';

@Injectable()
export class GuestIoServiceMock implements Partial<GuestIoServiceMock> {
  private _guests: Guest[];

  constructor(guests: Guest[]) {
    this._guests = guests.slice() || [];
  }

  public list(): Observable<Guest[]> {
    return of(this._guests);
  }

  public create(guest: Guest): Observable<Guest> {
    const copy = new Guest({
      id: guid(),
      brunchStatus: guest.brunchStatus,
      category: guest.category,
      ceremonyStatus: guest.ceremonyStatus,
      cocktailStatus: guest.cocktailStatus,
      dinerStatus: guest.dinerStatus,
      email: guest.email,
      firstName: guest.firstName,
      lastName: guest.lastName,
      invitedBy: guest.invitedBy,
      parentId: guest.parentId,
      plusOneId: guest.plusOneId,
    });

    this._guests = this._guests.concat([copy]);

    return of(copy).pipe(delay(1000));
  }

  public update(guest: Guest): Observable<Guest> {
    const index = findIndex(this._guests, (storeGuest) => storeGuest.id === guest.id);

    const newGuestArray = this._guests.slice().splice(index, 1, guest);

    this._guests = newGuestArray;

    return of(guest).pipe(delay(1000));
  }

  public delete(guestId: string): Observable<boolean> {
    const index = findIndex(this._guests, (storeGuest) => storeGuest.id === guestId);
    this._guests = this._guests.slice().splice(index - 1, 1);

    return of(true).pipe(delay(1000));
  }
}
