// angular
import { NgModule } from '@angular/core';

// primeng
import { TooltipModule } from 'primeng/tooltip';

// local
import { IconCellRendererComponent } from './cellRenderers';

@NgModule({
  imports: [TooltipModule],
  declarations: [IconCellRendererComponent],
})
export class BlotterModule {}
