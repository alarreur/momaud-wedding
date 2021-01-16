// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// firebase
import {
  AngularFireAuthGuard,
  canActivate,
  customClaims,
  hasCustomClaim,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

// rxjs
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

// app
import { RsvpComponent } from '@app/screens/rsvp';

// local
import { LoginComponent } from './components';
import { AppRoute } from './models';

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const isAdminOrRedirectToLogin = () =>
  pipe(
    customClaims,
    map((claims) => (claims && claims.admin ? true : ['login']))
  );

const defaultRoute = `/${AppRoute.Rsvp}`;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoute,
  },
  { path: AppRoute.Rsvp, component: RsvpComponent },
  { path: AppRoute.Program, component: RsvpComponent },
  { path: AppRoute.Accommodations, component: RsvpComponent },
  { path: AppRoute.WhishList, component: RsvpComponent },
  { path: AppRoute.Info, component: RsvpComponent },
  {
    path: AppRoute.Admin,
    loadChildren: () => import('./screens/admin/admin.module').then((module) => module.AdminModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  { path: AppRoute.Login, component: LoginComponent },
  { path: '**', redirectTo: defaultRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
