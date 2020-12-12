// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// app
import { Guest } from '@app/models';

@Injectable()
export class GuestIoServiceMock implements Partial<GuestIoServiceMock> {
  constructor(private readonly _guests) {}

  public list(): Observable<Guest[]> {
    return of(this._guests);
  }
}
