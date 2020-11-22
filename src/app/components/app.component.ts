// angular
import { Component, OnInit } from '@angular/core';

// primeng
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'momo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Maud & Amaury 2021';

  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
