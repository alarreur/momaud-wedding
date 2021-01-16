// angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// primeng
import { TooltipModule } from 'primeng/tooltip';

// local
import { IconCellRendererComponent, RelativeCellRendererComponent } from './cellRenderers';

@NgModule({
  imports: [TooltipModule, CommonModule],
  declarations: [IconCellRendererComponent, RelativeCellRendererComponent],
})
export class BlotterModule {}
