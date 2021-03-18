// angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, LOCALE_ID } from '@angular/core';

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
import { formatDate } from '@angular/common';

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
  LastAnswer = 'lastAnswer',
  LastUpdate = 'lastUpdate',
}

enum ColumnTypes {
  Action = 'action',
  InviteStatus = 'inviteStatus',
  RelativeGuest = 'relativeGuest',
  Timestamp = 'timestamp',
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
    private _confirmationService: ConfirmationService,
    @Inject(LOCALE_ID) private readonly _locale: string
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
          Columns.LastAnswer,
          Columns.LastUpdate,
        ],
        processCellCallback: (params) => {
          const colType = params.column.getColDef().type;
          const colDef = params.column.getColDef();

          if (colType && colType.indexOf(ColumnTypes.RelativeGuest) > -1) {
            const relativeNode = params.api.getRowNode(params.value);
            return relativeNode && relativeNode.data && new Guest(relativeNode.data).fullName;
          } else if (colType && colType.indexOf(ColumnTypes.InviteStatus) > -1) {
            return InviteStatus.toString(params.value);
          } else if (colDef.valueFormatter) {
            return typeof colDef.valueFormatter === 'string'
              ? colDef.valueFormatter
              : (colDef.valueFormatter as (params: any) => string)(params);
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
        [ColumnTypes.Action]: {
          cellRenderer: 'iconRenderer',
          width: 30,
        },
        [ColumnTypes.InviteStatus]: {
          width: 100,
          cellRenderer: 'iconRenderer',
          cellRendererParams: <IconCellRendererParams>{
            icon: (data: any) => InviteStatus.getIcon(data.value),
            tooltip: (data: any) => InviteStatus.toString(data.value),
          },
          cellClass: (params) => `${(params.value as string).toLowerCase()}`,
        },
        [ColumnTypes.RelativeGuest]: {
          width: 220,
          cellRenderer: 'relativeRenderer',
          cellRendererParams: <RelativeCellRendererParams>{
            guests$: this.guests$,
          },
        },
        [ColumnTypes.Timestamp]: {
          width: 200,
          valueFormatter: (params) => (params.value ? formatDate(params.value, 'short', this._locale) : ''),
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
          width: 150,
          sort: 'asc',
        },
        {
          field: Columns.FirstName,
          headerName: 'Prénom',
          width: 150,
        },
        {
          field: Columns.Email,
          width: 300,
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
        {
          field: Columns.LastAnswer,
          headerName: 'Dernière rép.',
          type: [ColumnTypes.Timestamp],
        },
        {
          field: Columns.LastUpdate,
          headerName: 'Dernière modif.',
          type: [ColumnTypes.Timestamp],
        },
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
