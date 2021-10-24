// angular
import { NgModule } from '@angular/core';

// primeng
import { GalleriaModule } from 'primeng/galleria';

// local
import { PhotosComponent } from './components';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    // primeng
    GalleriaModule,
  ],
  exports: [PhotosComponent],
})
export class PhotosModule {}
