import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'momo-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
