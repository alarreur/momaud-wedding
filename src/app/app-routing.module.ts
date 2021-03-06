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
import { ProgramComponent } from '@app/screens/program';

// local
import { LoginComponent } from './components';
import { AppRoute } from './models';
import { HomeComponent } from './screens/home';
import { InfoComponent } from './screens/info';
import { WishlistComponent } from './screens/wishlist';

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const isAdminOrRedirectToLogin = () =>
  pipe(
    customClaims,
    map((claims) => (claims && claims.admin ? true : ['login']))
  );

const defaultRoute = `/${AppRoute.Home}`;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoute,
  },
  { path: AppRoute.Home, component: HomeComponent },
  { path: AppRoute.Rsvp, component: RsvpComponent },
  { path: AppRoute.Program, component: ProgramComponent },
  { path: AppRoute.Info, component: InfoComponent },
  { path: AppRoute.Wishlist, component: WishlistComponent },
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
