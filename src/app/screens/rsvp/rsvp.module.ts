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

// local
import {
  AnswerComponent,
  EmailComponent,
  GuestSelectionComponent,
  PlusOneComponent,
  RecapComponent,
  RsvpComponent,
  WelcomeComponent,
} from './components';

// local

@NgModule({
  declarations: [
    RsvpComponent,
    WelcomeComponent,
    GuestSelectionComponent,
    EmailComponent,
    RecapComponent,
    PlusOneComponent,
    AnswerComponent,
  ],
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
  ],
  exports: [RsvpComponent],
})
export class RsvpModule {}
