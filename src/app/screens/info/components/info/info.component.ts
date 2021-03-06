// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// app
import { environment, KeyAddresses } from '@environment';

@Component({
  selector: 'momo-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  public keyAdresses: KeyAddresses = environment.keyAdresses;

  constructor() {}

  ngOnInit(): void {}
}
