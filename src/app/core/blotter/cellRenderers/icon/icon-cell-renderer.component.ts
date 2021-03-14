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

  public icon: string;
  public tooltip: string;

  public agInit(params: ICellRendererParams & IconCellRendererParams): void {
    this.params = params;
    this.refresh();
  }

  public refresh(): boolean {
    this.icon =
      typeof this.params.icon === 'function'
        ? (this.params.icon as (params: ICellRendererParams & IconCellRendererParams) => string)(this.params)
        : this.params.icon;

    this.tooltip =
      typeof this.params.tooltip === 'function'
        ? (this.params.tooltip as (params: ICellRendererParams & IconCellRendererParams) => string)(this.params)
        : this.params.tooltip;
    return false;
  }
}
