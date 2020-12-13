// angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';

// app
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, GuestFormComponent, GuestListComponent, UsersComponent } from './components';
import { UserService } from './services';

// app

@NgModule({
  declarations: [AdminComponent, UsersComponent, GuestListComponent, GuestFormComponent],
  imports: [
    // angular
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,

    // primeng
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    ToastModule,

    // ag-grid
    AgGridModule.withComponents([]),

    // screen
    AdminRoutingModule,
  ],
  providers: [UserService, MessageService],
})
export class AdminModule {}
