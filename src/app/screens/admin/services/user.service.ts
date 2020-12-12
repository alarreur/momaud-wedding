import { HttpClient } from '@angular/common/http';
// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// project
import { environment } from '@environment';

// local
import { PowerUser } from '../models';

const ADMIN_API = `${environment.adminBaseApi}/user`;

@Injectable()
export class UserService {
  constructor(private readonly _http: HttpClient) {}

  public getPowerUsers(): Observable<PowerUser[]> {
    return this._http.get(ADMIN_API) as Observable<PowerUser[]>;
  }
}
