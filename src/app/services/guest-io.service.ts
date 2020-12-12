// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// app
import { Guest } from '@app/models';

@Injectable()
export class GuestIoService {
  constructor(private readonly _http: HttpClient) {}

  public list(): Observable<Guest[]> {
    return null;
  }

  public guet(id: string): Observable<Guest> {
    return null;
  }
}
