// angular
import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { assert } from '@app/core/utils';

// app
import { Guest, InviteStatus } from '@app/models';
import { Step } from '@app/screens/rsvp/models';

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]?: U;
};

const propMappings: EnumDictionary<Step, keyof Guest> = {
  [Step.Ceremony]: 'ceremonyStatus',
  [Step.PlusOneCeremony]: 'ceremonyStatus',
  [Step.Cocktail]: 'cocktailStatus',
  [Step.PlusOneCocktail]: 'cocktailStatus',
  [Step.Diner]: 'dinerStatus',
  [Step.PlusOneDiner]: 'dinerStatus',
  [Step.Brunch]: 'brunchStatus',
  [Step.PlusOneBrunch]: 'brunchStatus',
};

@Component({
  selector: 'momo-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerComponent implements OnChanges {
  @Input() public step: Step;
  @Input() public guest: Guest;
  @Input() public isCurrentStep: boolean;
  @Output() public onPrevious = new EventEmitter<Guest>();
  @Output() public onNext = new EventEmitter<Guest>();

  public Step: typeof Step = Step;
  public isAttending: boolean;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.guest) {
      const propToUpdate = propMappings[this.step];
      const inviteStatus = this.guest && this.guest[propToUpdate];

      assert(
        inviteStatus !== InviteStatus.NotInvited,
        `Guest is not invited to ${this.step}. Preventing from moving forward...`,
        () => this.previous()
      );

      if (this.guest) {
        const status = this.guest[propToUpdate];
        this.isAttending = status === InviteStatus.Attends ? true : status === InviteStatus.Absent ? false : undefined;
      }
    }
  }

  public previous(): void {
    this.onPrevious.emit(this.save());
  }

  public next(): void {
    this.onNext.emit(this.save());
  }

  private save(): Guest {
    const propToUpdate = propMappings[this.step];

    return new Guest({
      ...this.guest,
      [propToUpdate]: this.isAttending ? InviteStatus.Attends : InviteStatus.Absent,
    });
  }
}
