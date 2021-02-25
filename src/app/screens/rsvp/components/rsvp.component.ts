// angular
import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// app
import { AppRoute, Guest } from '@app/models';
import { environment } from '@environment';

// local
import { Step } from '../models';
import { StepService } from '../services';

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

  constructor(private readonly _stepService: StepService, private readonly _router: Router) {
    this.steps$ = this._stepService.steps$.pipe(tap((steps) => (this.totalSteps = steps.length)));
    this.currentStepIndex = 0;
  }

  @HostListener('window:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'tab') {
      // tab navigation breaks animation by giving focus on next element
      event.preventDefault();
    }
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
      transition: `transform ${environment.rsvpTransitionDelay}ms ease 0s`,
    };
  }

  public redirectToProgram(): void {
    this._router.navigate([AppRoute.Program]);
  }
}
