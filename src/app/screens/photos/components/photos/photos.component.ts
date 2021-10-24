// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// local
import { Photo } from '@app/models';
import { PhotoService } from '@app/services';

@Component({
  selector: 'momo-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  public readonly photos$: Observable<Photo[]>;

  constructor(photoService: PhotoService) {
    this.photos$ = photoService.getPhotos();
  }

  ngOnInit(): void {}
}
