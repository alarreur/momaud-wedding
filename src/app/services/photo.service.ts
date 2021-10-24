// angular
import { Injectable } from '@angular/core';

// rxjs
import { map, switchMap } from 'rxjs/operators';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin, Observable } from 'rxjs';

// local
import { Photo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private readonly _storage: AngularFireStorage) {}

  public getPhotos(): Observable<Photo[]> {
    return this._storage
      .ref('photos')
      .listAll()
      .pipe(
        switchMap((listResult) =>
          forkJoin(
            listResult.items.map((photoRef) =>
              forkJoin(photoRef.getDownloadURL(), photoRef.getMetadata()).pipe(
                map(
                  ([url, metadata]) =>
                    ({
                      name: photoRef.name,
                      url,
                      metadata,
                    } as Photo)
                )
              )
            )
          )
        )
      );
  }
}
