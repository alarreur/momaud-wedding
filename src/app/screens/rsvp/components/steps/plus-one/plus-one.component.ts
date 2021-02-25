// angular
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

// app
import { Guest, InviteStatus } from '@app/models';

@Component({
  selector: 'momo-plus-one',
  templateUrl: './plus-one.component.html',
  styleUrls: ['./plus-one.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusOneComponent {
  @Input() public guest: Guest;
  @Input() public plusOne: Guest;
  @Input() public isCurrentStep: boolean;
  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  public get isOverallAttending(): boolean {
    return (
      this.guest &&
      (this.guest.ceremonyStatus === InviteStatus.Attends ||
        this.guest.cocktailStatus === InviteStatus.Attends ||
        this.guest.dinerStatus === InviteStatus.Attends ||
        this.guest.brunchStatus === InviteStatus.Attends)
    );
  }

  constructor() {}
}
