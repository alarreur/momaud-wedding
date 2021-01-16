// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// primeng
import { MenuItem } from 'primeng/api';

// local
import { AdminRoute } from '../models';

@Component({
  selector: 'momo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  public menuItems: MenuItem[] = [
    {
      label: 'Invités',
      routerLink: AdminRoute.Guests,
    },
    {
      label: 'Administrateurs',
      routerLink: AdminRoute.Users,
    },
  ];

  constructor() {}

  public ngOnInit(): void {}
}
