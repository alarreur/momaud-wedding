// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

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

    return of(copy).pipe(delay(1000));
  }
}
