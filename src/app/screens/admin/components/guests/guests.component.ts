import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'momo-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
