import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';

/**
 * Inspired from https://admin.indepth.dev/responsive-angular/
 */
@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  public match(query: string): Observable<boolean> {
    // we need to make sure we are in browser
    if (window) {
      const result = new ReplaySubject<boolean>(1);
      const mediaQueryList = window.matchMedia(query);
      const listener = createListener(result);

      // run once and then add listener
      listener(mediaQueryList);
      mediaQueryList.addEventListener('change', listener);

      return result;
    }

    return of(false);
  }
}

const createListener = (matches) => (event) => matches.next(event.matches);
