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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { MultiSelectModule } from 'primeng/multiselect';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';

// app
import { AdminRoutingModule } from './admin-routing.module';
import { IconCellRendererComponent } from '@app/core/blotter';

// local
import { UserService } from './services';
import { AdminComponent, GuestFormComponent, GuestListComponent, UsersComponent } from './components';
import { BlotterModule } from '@app/core/blotter';

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
    ConfirmDialogModule,
    TabMenuModule,
    MultiSelectModule,

    // ag-grid
    AgGridModule.withComponents([IconCellRendererComponent]),

    // screen
    AdminRoutingModule,

    // blotter
    BlotterModule,
  ],
  providers: [UserService, MessageService, ConfirmationService],
})
export class AdminModule {}
