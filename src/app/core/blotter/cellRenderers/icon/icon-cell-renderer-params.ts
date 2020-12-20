// rxjs
import { Observable } from 'rxjs';

export interface IconCellRendererParams {
  icon: string;
  tooltip: string | null;
  onClick: (data: any) => void | null;
}
