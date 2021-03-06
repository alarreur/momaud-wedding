// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// app
import { environment, KeyAddresses } from '@environment';

@Component({
  selector: 'momo-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent implements OnInit {
  public keyAdresses: KeyAddresses = environment.keyAdresses;

  constructor() {}

  ngOnInit(): void {}
}
