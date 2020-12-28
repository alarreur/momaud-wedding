// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// lodash
import { findIndex, remove } from 'lodash';

// app
import { Guest, guid } from '@app/models';
import { delay } from 'rxjs/operators';

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

    if (guest.plusOneId) {
      const plusOneIndex = this._guests.findIndex((g) => g.id === guest.plusOneId);
      this._guests[plusOneIndex] = new Guest({ ...this._guests[plusOneIndex], plusOneId: copy.id });
    }

    return of(copy).pipe(delay(1000));
  }

  public update(guests: Guest[]): Observable<Guest[]> {
    // TODO manage plusOne edition

    const newGuestArray = this._guests.slice();

    guests.forEach((guest) =>
      newGuestArray.splice(
        findIndex(newGuestArray, (storeGuest) => storeGuest.id === guest.id),
        1,
        guest
      )
    );

    this._guests = newGuestArray;

    return of(guests).pipe(delay(1000));
  }

  public delete(guestIds: string[]): Observable<boolean[]> {
    // TODO manage plusOne & parent deletion
    return of(guestIds.map(() => true)).pipe(delay(1000));
  }
}
