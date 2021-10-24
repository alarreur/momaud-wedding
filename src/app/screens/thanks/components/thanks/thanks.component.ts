// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// app
import { AppRoute } from '@app/models';

@Component({
  selector: 'momo-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksComponent implements OnInit {
  public AppRoutes: typeof AppRoute = AppRoute;

  constructor() {}

  ngOnInit(): void {}
}
