// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// local
import { HomeComponent } from './components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    // angular
    RouterModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
