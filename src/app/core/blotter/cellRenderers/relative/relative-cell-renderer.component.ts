// angular
import { Component, ChangeDetectionStrategy } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ag-grid
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

// local
import { RelativeCellRendererParams } from './relative-cell-renderer-params';

@Component({
  selector: 'momo-relative-cell-renderer',
  templateUrl: './relative-cell-renderer.component.html',
  styleUrls: ['./relative-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelativeCellRendererComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams & RelativeCellRendererParams;

  public fullName$: Observable<string>;

  public agInit(params: ICellRendererParams & RelativeCellRendererParams): void {
    this.params = params;
    this.fullName$ = this.params.guests$.pipe(
      map((guests) => {
        const relative = guests && guests.find((guest) => guest.id === this.params.value);

        return relative && relative.fullName;
      })
    );
  }

  public refresh(): boolean {
    return false;
  }
}
