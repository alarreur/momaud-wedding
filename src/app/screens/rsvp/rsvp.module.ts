// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// local
import {
  AnswerComponent,
  EmailComponent,
  GuestSelectionComponent,
  PlusOneComponent,
  RecapComponent,
  RsvpComponent,
} from './components';

@NgModule({
  declarations: [RsvpComponent, GuestSelectionComponent, EmailComponent, RecapComponent, PlusOneComponent, AnswerComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,

    // primeng
    ProgressSpinnerModule,
    ButtonModule,
    RippleModule,
    AutoCompleteModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  exports: [RsvpComponent],
})
export class RsvpModule {}
