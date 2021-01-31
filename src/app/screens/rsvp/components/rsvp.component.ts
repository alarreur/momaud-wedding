// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// app
import { Guest } from '@app/models';

// local
import { Step } from '../models';
import { StepService } from '../services';
import { tap } from 'rxjs/operators';

const TRANSITION_TIME = 1000;

@Component({
  selector: 'momo-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RsvpComponent implements OnInit {
  public steps$: Observable<Step[]>;
  public currentStepIndex: number;
  public Step: typeof Step = Step;

  public guest: Guest;
  public plusOne: Guest;

  private totalSteps: number;

  constructor(private readonly _stepService: StepService) {
    this.steps$ = this._stepService.steps$.pipe(tap((steps) => (this.totalSteps = steps.length)));
    this.currentStepIndex = 0;
  }

  public ngOnInit(): void {}

  public navBackward(): void {
    if (this.currentStepIndex >= 1) {
      this.currentStepIndex--;
    }
  }

  public navForward(): void {
    if (this.currentStepIndex <= this.totalSteps) {
      this.currentStepIndex++;
    }
  }

  public onGuestSelected($event: { guest: Guest; plusOne?: Guest }): void {
    this.guest = $event.guest;
    this.plusOne = $event.plusOne;
    this.navForward();
  }

  public getTranslateStyle() {
    return {
      transform: `translate3d(0, -${this.currentStepIndex * 100}%, 0)`,
      transition: `transform ${TRANSITION_TIME}ms ease 0s`,
    };
  }
}
