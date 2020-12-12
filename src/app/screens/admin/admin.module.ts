// angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';

// app
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, GuestListComponent, UsersComponent } from './components';
import { UserService } from './services';

// app

@NgModule({
  declarations: [AdminComponent, GuestListComponent, UsersComponent],
  imports: [
    // angular
    HttpClientModule,
    CommonModule,

    // primeng
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DialogModule,

    // ag-grid
    AgGridModule.withComponents([]),

    // screen
    AdminRoutingModule,
  ],
  providers: [UserService],
})
export class AdminModule {}
