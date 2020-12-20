// angular
import { Component, ChangeDetectionStrategy } from '@angular/core';

// ag-grid
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IconCellRendererParams } from './icon-cell-renderer-params';

@Component({
  selector: 'momo-icon-cell-renderer',
  templateUrl: './icon-cell-renderer.component.html',
  styleUrls: ['./icon-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCellRendererComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams & IconCellRendererParams;

  public agInit(params: ICellRendererParams & IconCellRendererParams): void {
    this.params = params;
  }

  public refresh(): boolean {
    return false;
  }
}
