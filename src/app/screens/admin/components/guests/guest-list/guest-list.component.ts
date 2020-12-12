// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// rxks
import { Observable } from 'rxjs';

// ag-grid
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';

// app
import { Guest } from '@app/models';
import { GuestService } from '@app/services';

export interface GuestValueFormatterParams extends ValueFormatterParams {
  value: Guest;
}

@Component({
  selector: 'momo-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestListComponent implements OnInit {
  public guests$: Observable<Guest[]>;
  public addDialogVisbility: boolean;

  public gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
    },
    columnDefs: [
      {
        field: 'lastName',
        headerName: 'Nom',
      },
      {
        field: 'firstName',
        headerName: 'Prénom',
      },
      {
        field: 'email',
      },
      {
        field: 'cermonyStatus',
        headerName: 'Cérmonie',
      },
      {
        field: 'cocktailStatus',
        headerName: 'Cocktail',
      },
      {
        field: 'dinerStatus',
        headerName: 'Dîner',
      },
      {
        field: 'brunchStatus',
        headerName: 'Brunch',
      },
      {
        field: 'plusOne',
        headerName: '+ 1',
        // valueFormatter: (params: GuestValueFormatterParams) => params.value.plusOne && params.value.plusOne.toString(),
      },
      {
        field: 'children',
        headerName: 'Enfants',
        // valueFormatter: (params: GuestValueFormatterParams) =>
        //   params.value.children && params.value.children.map((child) => child.toString()).join(', '),
      },
    ],
  };

  constructor(private readonly _guestService: GuestService) {
    this.guests$ = this._guestService.getAll();
  }

  public ngOnInit(): void {}
}
