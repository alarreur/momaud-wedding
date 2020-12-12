// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// ag-grid
import { GridOptions } from 'ag-grid-community';

// local
import { PowerUser } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'momo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  public users$: Observable<PowerUser[]>;

  public gridOptions: GridOptions = {
    columnDefs: [
      {
        field: 'uid',
        headerName: 'UID',
      },
      {
        field: 'email',
      },
    ],
  };

  constructor(private readonly _userService: UserService) {
    this.users$ = this._userService.getPowerUsers();
  }

  public ngOnInit(): void {}
}
