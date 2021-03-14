// angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// rxks
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

// ag-grid
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';

// primeng
import { ConfirmationService } from 'primeng/api';

// app
import { Guest, InviteStatus } from '@app/models';
import { GuestService } from '@app/services';
import {
  IconCellRendererComponent,
  IconCellRendererParams,
  RelativeCellRendererComponent,
  RelativeCellRendererParams,
} from '@app/core/blotter';

export interface GuestValueFormatterParams extends ValueFormatterParams {
  data: Guest;
}

enum Columns {
  LastName = 'lastName',
  FirstName = 'firstName',
  Email = 'email',
  CeremonyStatus = 'ceremonyStatus',
  CocktailStatus = 'cocktailStatus',
  DinerStatus = 'dinerStatus',
  BrunchStatus = 'brunchStatus',
  PlusOneId = 'plusOneId',
}

enum ColumnTypes {
  Action = 'action',
  InviteStatus = 'inviteStatus',
  RelativeGuest = 'relativeGuest',
}

@Component({
  selector: 'momo-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestListComponent implements OnInit {
  public guests$: Observable<Guest[]>;
  public filterGuest$: Subject<string> = new Subject();
  public addDialogVisbility: boolean;

  public editionGuest: Guest;

  public gridOptions: GridOptions;

  constructor(
    private readonly _guestService: GuestService,
    private readonly _cdr: ChangeDetectorRef,
    private _confirmationService: ConfirmationService
  ) {
    this.guests$ = this.filterGuest$.pipe(
      startWith(null as string),
      switchMap((searchTerm) =>
        _guestService.list().pipe(
          map((guests) => {
            return guests.filter((guest) => !searchTerm || guest.isSearchCandidate(searchTerm));
          })
        )
      )
    );

    this.initOptions();
  }

  public ngOnInit(): void {}

  public exportAsCsv(): void {
    if (this.gridOptions) {
      this.gridOptions.api.exportDataAsCsv({
        columnKeys: [
          Columns.LastName,
          Columns.FirstName,
          Columns.Email,
          Columns.CeremonyStatus,
          Columns.CocktailStatus,
          Columns.DinerStatus,
          Columns.BrunchStatus,
          Columns.PlusOneId,
        ],
        processCellCallback: (params) => {
          const colType = params.column.getColDef().type;

          if (colType && colType.indexOf(ColumnTypes.RelativeGuest) > -1) {
            const relativeNode = params.api.getRowNode(params.value);
            return relativeNode && relativeNode.data && new Guest(relativeNode.data).fullName;
          } else if (colType && colType.indexOf(ColumnTypes.InviteStatus) > -1) {
            return InviteStatus.toString(params.value);
          }

          return params.value;
        },
      });
    }
  }

  private initOptions(): void {
    this.gridOptions = {
      getRowNodeId: (guest: Guest) => guest.id,
      defaultColDef: {
        sortable: true,
      },
      frameworkComponents: {
        iconRenderer: IconCellRendererComponent,
        relativeRenderer: RelativeCellRendererComponent,
      },
      columnTypes: {
        action: {
          cellRenderer: 'iconRenderer',
          width: 30,
        },
        inviteStatus: {
          width: 100,
          cellRenderer: 'iconRenderer',
          cellRendererParams: <IconCellRendererParams>{
            icon: (data: any) => InviteStatus.getIcon(data.value),
            tooltip: (data: any) => InviteStatus.toString(data.value),
          },
          cellClass: (params) => `${(params.value as string).toLowerCase()}`,
        },
        relativeGuest: {
          width: 220,
          cellRenderer: 'relativeRenderer',
          cellRendererParams: <RelativeCellRendererParams>{
            guests$: this.guests$,
          },
        },
      },
      columnDefs: [
        {
          type: [ColumnTypes.Action],
          cellRendererParams: <IconCellRendererParams>{
            icon: 'pi pi-user-edit',
            tooltip: 'Editer',
            onClick: this.editGuest.bind(this),
          },
        },
        {
          type: [ColumnTypes.Action],
          cellRendererParams: <IconCellRendererParams>{
            icon: 'pi pi-times',
            tooltip: 'Supprimer',
            onClick: this.deleteGuest.bind(this),
          },
        },
        {
          field: Columns.LastName,
          headerName: 'Nom',
          width: 190,
          sort: 'asc',
        },
        {
          field: Columns.FirstName,
          headerName: 'Prénom',
          width: 170,
        },
        {
          field: Columns.Email,
          width: 350,
        },
        {
          field: Columns.CeremonyStatus,
          headerName: 'Cérémonie',
          type: [ColumnTypes.InviteStatus],
        },
        {
          field: Columns.CocktailStatus,
          headerName: 'Cocktail',
          type: [ColumnTypes.InviteStatus],
        },
        {
          field: Columns.DinerStatus,
          headerName: 'Dîner',
          type: [ColumnTypes.InviteStatus],
        },
        {
          field: Columns.BrunchStatus,
          headerName: 'Brunch',
          type: [ColumnTypes.InviteStatus],
        },
        {
          field: Columns.PlusOneId,
          headerName: '+ 1',
          type: [ColumnTypes.RelativeGuest],
        },
        // {
        //   field: 'parentId',
        //   headerName: 'Parent',
        //   type: [ColumnTypes.RelativeGuest],
        // },
      ],
    };
  }

  private editGuest(guest: Guest): void {
    this.editionGuest = guest;
    this.addDialogVisbility = true;
    this._cdr.detectChanges();
  }

  private deleteGuest(guest: Guest): void {
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
