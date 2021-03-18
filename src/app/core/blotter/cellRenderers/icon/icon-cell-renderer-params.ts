export interface IconCellRendererParams {
  icon: string | ((data: this & IconCellRendererParams) => string);
  tooltip: string | ((data: this & IconCellRendererParams) => string) | null;
  onClick: (data: any) => void | null;
}
