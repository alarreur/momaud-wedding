import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'momo-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
