import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'momo-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RsvpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
