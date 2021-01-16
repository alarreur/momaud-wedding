// angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// rxks
import { Observable } from 'rxjs';

// ag-grid
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';

// primeng
import { ConfirmationService } from 'primeng/api';

// app
import { Guest, InviteStatus } from '@app/models';
import { GuestService } from '@app/services';
import { IconCellRendererComponent, IconCellRendererParams } from '@app/core/blotter';

export interface GuestValueFormatterParams extends ValueFormatterParams {
  data: Guest;
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

  public editionGuest: Guest;

  public gridOptions: GridOptions = {
    getRowNodeId: (guest: Guest) => guest.id,
    defaultColDef: {
      sortable: true,
    },
    frameworkComponents: {
      iconRenderer: IconCellRendererComponent,
    },
    columnTypes: {
      action: {
        cellRenderer: 'iconRenderer',
        width: 30,
      },
      inviteStatus: {
        width: 120,
        valueFormatter: (params: GuestValueFormatterParams) => params.value && InviteStatus.toString(params.value),
      },
      relativeGuest: {
        width: 270,
        valueFormatter: (params: GuestValueFormatterParams) => params.value && params.api.getRowNode(params.value).data.fullName,
      },
    },
    columnDefs: [
      {
        type: ['action'],
        cellRendererParams: <IconCellRendererParams>{
          icon: 'pi pi-user-edit',
          tooltip: 'Editer',
          onClick: this.editGuest.bind(this),
        },
      },
      {
        type: ['action'],
        cellRendererParams: <IconCellRendererParams>{
          icon: 'pi pi-times',
          tooltip: 'Supprimer',
          onClick: this.deleteGuest.bind(this),
        },
      },
      {
        field: 'lastName',
        headerName: 'Nom',
        width: 140,
      },
      {
        field: 'firstName',
        headerName: 'Prénom',
        width: 140,
      },
      {
        field: 'email',
        width: 270,
      },
      {
        field: 'ceremonyStatus',
        headerName: 'Cérmonie',
        type: ['inviteStatus'],
      },
      {
        field: 'cocktailStatus',
        headerName: 'Cocktail',
        type: ['inviteStatus'],
      },
      {
        field: 'dinerStatus',
        headerName: 'Dîner',
        type: ['inviteStatus'],
      },
      {
        field: 'brunchStatus',
        headerName: 'Brunch',
        type: ['inviteStatus'],
      },
      {
        field: 'plusOneId',
        headerName: '+ 1',
        type: ['relativeGuest'],
      },
      {
        field: 'parentId',
        headerName: 'Parent',
        type: ['relativeGuest'],
      },
    ],
  };

  constructor(
    private readonly _guestService: GuestService,
    private readonly _cdr: ChangeDetectorRef,
    private _confirmationService: ConfirmationService
  ) {
    this.guests$ = this._guestService.list();
  }

  public ngOnInit(): void {}

  public closeForm(): void {
    this.editionGuest = null;
    this.addDialogVisbility = false;
  }

  private editGuest(guest: Guest) {
    this.editionGuest = guest;
    this.addDialogVisbility = true;
    this._cdr.detectChanges();
  }

  private deleteGuest(guest: Guest) {
    this._confirmationService.confirm({
      key: 'deleteDialog',
      message: `Êtes-vous sûr de vouloir supprimer ${guest.fullName} ?`,
      accept: () => {
        this._guestService.delete(guest);
      },
    });
    this._cdr.detectChanges();
  }
}
