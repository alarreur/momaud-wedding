// rxjs
import { Observable } from 'rxjs';

// app
import { Guest } from '@app/models';

export interface RelativeCellRendererParams {
  guests$: Observable<Guest[]>;
}
