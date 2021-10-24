// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ORIGIN as FUNCTIONS_ORIGIN } from '@angular/fire/functions';

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

// local
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent, MenuComponent, LoginComponent, AppComponent } from './components';
import { rootEffets, rootReducers } from './services/ngrx';
import { GuestService } from './services';
import { RsvpModule } from './screens/rsvp/rsvp.module';
import { smallScreenProvider } from './core/providers';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuComponent, LoginComponent],
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
    AngularFireStorageModule,

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
    RsvpModule,
  ],
  providers: [
    // firebase
    { provide: FIRESTORE_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:8080', ssl: false } : {} },
    { provide: FUNCTIONS_ORIGIN, useFactory: () => (environment.useEmulators ? 'http://localhost:5001' : undefined) },

    GuestService,

    smallScreenProvider(environment.smallScreenBreakpoint),

    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
