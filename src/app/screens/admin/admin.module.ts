// angular
import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

// app
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, GuestsComponent, UsersComponent } from './components';

// app

@NgModule({
  declarations: [AdminComponent, GuestsComponent, UsersComponent],
  imports: [
    // primeng
    ButtonModule,
    InputTextModule,
    TooltipModule,

    // screen
    AdminRoutingModule,
  ],
  providers: [],
})
export class AdminModule {}
