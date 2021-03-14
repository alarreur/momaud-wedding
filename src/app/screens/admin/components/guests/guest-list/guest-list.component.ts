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
          width: 190,
          sort: 'asc',
        },
        {
          field: 'firstName',
          headerName: 'Prénom',
          width: 170,
        },
        {
          field: 'email',
          width: 350,
        },
        {
          field: 'ceremonyStatus',
          headerName: 'Cérémonie',
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
        // {
        //   field: 'parentId',
        //   headerName: 'Parent',
        //   type: ['relativeGuest'],
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
