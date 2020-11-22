// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// primeng
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

// app
import { RsvpComponent } from '@app/screens/rsvp';

// local
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent, MenuComponent, LoginComponent, AppComponent } from './components';

import { environment } from '@environment';

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

    // primeng
    SidebarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TooltipModule,

    // app
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
