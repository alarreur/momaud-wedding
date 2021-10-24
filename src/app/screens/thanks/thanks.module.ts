// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// local
import { ThanksComponent } from './components';

@NgModule({
  declarations: [ThanksComponent],
  imports: [
    // angular
    RouterModule,
  ],
  exports: [ThanksComponent],
})
export class ThanksModule {}
