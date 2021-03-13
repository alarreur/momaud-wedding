// angular
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  OnChanges,
  Input,
} from '@angular/core';

// rxjs
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

// primeng
import { AutoComplete } from 'primeng/autocomplete';

// app
import { Guest } from '@app/models';
import { StepService } from '@app/screens/rsvp/services';
import { environment, SIGNED_IN_GUEST_KEY } from '@environment';

@Component({
  selector: 'momo-guest-selection',
  templateUrl: './guest-selection.component.html',
  styleUrls: ['./guest-selection.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestSelectionComponent implements OnChanges {
  public guest: Guest;

  public guestsSuggestions$: Observable<Guest[]>;
  public searchGuest$: Subject<string> = new Subject();

  @Input() public isCurrentStep: boolean;
  @Output() public onSelected = new EventEmitter<{ guest: Guest; plusOne?: Guest }>();

  @ViewChild(AutoComplete)
  public readonly guestSelection: AutoComplete;

  constructor(private readonly _stepService: StepService, private readonly _cd: ChangeDetectorRef) {
    this.guestsSuggestions$ = this.searchGuest$.pipe(
      debounceTime(300),
      switchMap((searchTerm) => _stepService.getGuestSuggestion(searchTerm))
    );

    this.initializeGuest();
  }

  public ngOnChanges(): void {
    if (this.isCurrentStep && this.guestSelection) {
      setTimeout(() => this.guestSelection.focusInput(), environment.rsvpTransitionDelay);
    }
  }

  public signInGuest(): void {
    this._stepService.signInGuest(this.guest).subscribe(({ guest, plusOne }) => {
      window.localStorage.setItem(SIGNED_IN_GUEST_KEY, this.guest.id);
      this.onSelected.emit({ guest, plusOne });
    });
  }

  private initializeGuest(): void {
    const guestId = window.localStorage.getItem(SIGNED_IN_GUEST_KEY);

    if (guestId) {
      this._stepService.getGuestById(guestId).subscribe((guest) => {
        this.guest = guest;
        this._cd.markForCheck();
      });
    }
  }
}
