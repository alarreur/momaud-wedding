// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// primeng
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

// environment
import { environment } from '@environment';

// data
import { guestListMock } from '@data/guest.mock';

// app
import { RsvpComponent } from '@app/screens/rsvp';

// local
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent, MenuComponent, LoginComponent, AppComponent } from './components';
import { rootEffets, rootReducers } from './services/ngrx';
import { GuestIoService } from './services/guest-io.service';
import { GuestIoServiceMock } from './services/guest-io.service.mock';
import { GuestService } from './services';

@NgModule({
  declarations: [AppComponent, HeaderComponent, RsvpComponent, MenuComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // font awesome
    FontAwesomeModule,

    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    // ngrx
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffets),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // primeng
    SidebarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TooltipModule,

    // app
    AppRoutingModule,
  ],
  providers: [
    GuestService,
    // GuestIoService,
    { provide: GuestIoService, useValue: new GuestIoServiceMock(guestListMock) },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
