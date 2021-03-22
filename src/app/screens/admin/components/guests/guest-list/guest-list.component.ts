// angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, LOCALE_ID } from '@angular/core';

// rxks
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// ag-grid
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';

// primeng
import { ConfirmationService, SelectItem } from 'primeng/api';

// app
import { Guest, GuestCategory, Host, InviteStatus } from '@app/models';
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
  InvitedBy = 'invitedBy',
  Category = 'category',
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
  public filterSearchTerm$: Subject<string> = new BehaviorSubject(null);
  public filterCategory$: Subject<GuestCategory[]> = new BehaviorSubject(null);
  public filterHost$: Subject<Host[]> = new BehaviorSubject(null);
  public addDialogVisbility: boolean;

  public editionGuest: Guest;

  public gridOptions: GridOptions;

  public categories: SelectItem[] = Object.keys(GuestCategory)
    .filter((key) => key !== 'toString')
    .map((key) => (GuestCategory as any)[key])
    .map((value: GuestCategory) => ({
      value,
      label: GuestCategory.toString(value),
    }));

  public hosts: SelectItem[] = Object.keys(Host)
    .filter((key) => key !== 'toString')
    .map((key) => (Host as any)[key])
    .map((value: Host) => ({
      value,
      label: Host.toString(value),
    }));

  constructor(
    private readonly _guestService: GuestService,
    private readonly _cdr: ChangeDetectorRef,
    private _confirmationService: ConfirmationService,
    @Inject(LOCALE_ID) private readonly _locale: string
  ) {
    this.guests$ = combineLatest([this.filterSearchTerm$, this.filterCategory$, this.filterHost$]).pipe(
      switchMap(([searchTerm, categories, hosts]) =>
        _guestService.list().pipe(
          map((guests) => {
            const matchedGuests = guests.filter((guest) =>
              guest.isSearchCandidate(
                { searchTerm, categories, hosts },
                guest.plusOneId && guests.find((g) => g.id === guest.plusOneId)
              )
            );

            return matchedGuests;
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
          Columns.Category,
          Columns.InvitedBy,
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
        filter: true,
        filterParams: {
          buttons: ['reset'],
        },
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
          filter: false,
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
        {
          field: Columns.Category,
          headerName: 'Categorie',
          width: 100,
          valueFormatter: (params: ValueFormatterParams) => GuestCategory.toString(params.value),
        },
        {
          field: Columns.InvitedBy,
          headerName: 'Invité par',
          width: 100,
          valueFormatter: (params: ValueFormatterParams) => Host.toString(params.value),
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
      onRowDoubleClicked: (event) => {
        this.editGuest(event.data);
      },
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
