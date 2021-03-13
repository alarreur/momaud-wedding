// angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// primeng

// local
import { ProgramComponent } from './components';

@NgModule({
  declarations: [ProgramComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ProgramComponent],
})
export class ProgramModule {}
