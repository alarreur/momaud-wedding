// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// local
import { AdminRoute, defaultRoute } from './models';
import { AdminComponent, GuestListComponent, UsersComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: AdminRoute.Guests, component: GuestListComponent },
      { path: AdminRoute.Users, component: UsersComponent },
      { path: '', pathMatch: 'full', redirectTo: defaultRoute },
      { path: '**', redirectTo: defaultRoute },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
