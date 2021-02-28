// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// local
import { InfoComponent } from './components';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    // angular
    RouterModule,
  ],
  exports: [InfoComponent],
})
export class InfoModule {}
