// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// app
import { AppRoute } from '@app/models';

@Component({
  selector: 'momo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public AppRoutes: typeof AppRoute = AppRoute;

  constructor() {}

  ngOnInit(): void {}
}
