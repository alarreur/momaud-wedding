import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'momo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  @Output() public onRsvp = new EventEmitter<void>();

  constructor() {}
}
