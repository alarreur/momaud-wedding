// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// local
import { WishlistComponent } from './components';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    // angular
    RouterModule,
  ],
  exports: [WishlistComponent],
})
export class WishlistModule {}
