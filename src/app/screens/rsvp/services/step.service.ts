// angular
import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

// app
import { Guest, InviteStatus } from '@app/models';
import { GuestService } from '@app/services';

// local
import { Step } from '../models';

const initialSteps = [Step.GuestSelection, Step.Email];

@Injectable({ providedIn: 'root' })
export class StepService {
  private readonly _steps$: BehaviorSubject<Step[]>;

  public get steps$(): Observable<Step[]> {
    return this._steps$.asObservable();
  }

  constructor(private readonly _guestService: GuestService) {
    this._steps$ = new BehaviorSubject(initialSteps);
  }

  public getGuestSuggestion(searchTerm: string): Observable<Guest[]> {
    return this._guestService.search(searchTerm);
  }

  public getGuestById(guestId: string): Observable<Guest> {
    return this._guestService.get(guestId).pipe(first());
  }

  public signInGuest(guest: Guest): Observable<{ guest: Guest; plusOne: Guest }> {
    const plusOne$ = guest.plusOneId ? this.getGuestById(guest.plusOneId) : of(null);

    return plusOne$.pipe(
      map((plusOne) => {
        const newSteps = [];

        if (guest.ceremonyStatus !== InviteStatus.NotInvited) {
          newSteps.push(Step.Ceremony);
        }

        if (guest.cocktailStatus !== InviteStatus.NotInvited) {
          newSteps.push(Step.Cocktail);
        }

        if (guest.dinerStatus !== InviteStatus.NotInvited) {
          newSteps.push(Step.Diner);
        }

        if (guest.brunchStatus !== InviteStatus.NotInvited) {
          newSteps.push(Step.Brunch);
        }

        if (plusOne) {
          newSteps.push(Step.PlusOneWelcome);
          newSteps.push(Step.PlusOneEmail);

          if (plusOne.ceremonyStatus !== InviteStatus.NotInvited) {
            newSteps.push(Step.PlusOneCeremony);
          }

          if (plusOne.cocktailStatus !== InviteStatus.NotInvited) {
            newSteps.push(Step.PlusOneCocktail);
          }

          if (plusOne.dinerStatus !== InviteStatus.NotInvited) {
            newSteps.push(Step.PlusOneDiner);
          }

          if (plusOne.brunchStatus !== InviteStatus.NotInvited) {
            newSteps.push(Step.PlusOneBrunch);
          }
        }

        this._steps$.next([...initialSteps, ...newSteps, Step.Recap]);

        return { guest, plusOne };
      })
    );
  }

  public isCurrentStep(currentStepIndex: number, step: Step): boolean {
    const steps = this._steps$.getValue();

    try {
      return steps[currentStepIndex] === step;
    } catch {
      return false;
    }
  }

  public save(guest: Guest, plusOne?: Guest): Observable<void> {
    return forkJoin(
      [guest, plusOne].filter((guest) => !!guest).map((guest) => this._guestService.update(guest).pipe(first()))
    ).pipe(map(() => void 0));
  }
}
