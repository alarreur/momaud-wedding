// angular
import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

// primeng
import { MessageService } from 'primeng/api';

// rxjs
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, finalize, first, map, startWith, switchMap, tap } from 'rxjs/operators';

// app
import { Guest, GuestCategory, Host, InviteStatus } from '@app/models';
import { GuestService } from '@app/services';

@Component({
  selector: 'momo-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestFormComponent implements OnInit, OnChanges {
  @Input()
  public guest: Guest;

  @Output()
  public cancelled: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public saved: EventEmitter<Guest> = new EventEmitter<Guest>();

  public form: FormGroup;

  public inviteStatuses = Object.keys(InviteStatus)
    .filter((key) => key !== 'toString')
    .map((key) => InviteStatus[key])
    .map((key: InviteStatus) => ({
      key: key,
      label: InviteStatus.toString(key),
    }));

  public categories = Object.keys(GuestCategory)
    .filter((key) => key !== 'toString')
    .map((key) => GuestCategory[key])
    .map((key: GuestCategory) => ({
      key: key,
      label: GuestCategory.toString(key),
    }));

  public hosts = Object.keys(Host)
    .map((key) => Host[key])
    .map((key: Host) => ({
      key: key,
      label: key,
    }));

  public guestsSuggestions$: Observable<Guest[]>;
  public searchGuest$: Subject<string> = new Subject();
  public cannotSave$: Observable<boolean>;

  private _saving$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly _guestService: GuestService, private messageService: MessageService) {
    this.guestsSuggestions$ = this.searchGuest$.pipe(
      debounceTime(300),
      switchMap((searchTerm) =>
        _guestService.getAll().pipe(map((guests) => guests.filter((guest) => guest.isSearchCandidate(searchTerm))))
      )
    );
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(
        null,
        null,
        AsyncValidators.uniqueGuest(
          this._guestService.getAll(),
          () => this.form && this.form.get('firstName').value,
          () => this.form && this.form.get('lastName').value,
          () => this.guest && this.guest.id
        )
      ),
      email: new FormControl(null, Validators.email),
      category: new FormControl(null, Validators.required),
      invitedBy: new FormControl(null, Validators.required),
      ceremonyStatus: new FormControl(null, Validators.required),
      cocktailStatus: new FormControl(null, Validators.required),
      dinerStatus: new FormControl(null, Validators.required),
      brunchStatus: new FormControl(null, Validators.required),
      plusOneId: new FormControl(),
      parentId: new FormControl(),
    });

    this.cannotSave$ = combineLatest([
      this._saving$,
      this.form.valueChanges.pipe(
        map(() => this.form.invalid),
        startWith(this.form.invalid)
      ),
    ]).pipe(map(([saving, invalid]) => saving || invalid));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.guest) {
      this.form.patchValue(changes.guest);
    }
  }

  public getErrors(controlName: keyof Guest): string[] {
    const control = this.form.get(controlName);

    if (!control.pristine && control.invalid) {
      return Object.keys(control.errors).map((errorCode) => {
        switch (errorCode) {
          case 'required':
            return `Ce champs est requis`;
          case 'email':
            return `Email non valide`;
          case 'hasDuplicate':
            return `Cet invité existe déjà`;
          case '':
            return control.getError(errorCode).message;
            break;
          default:
            break;
        }
      });
    }
  }

  public save(): void {
    this._saving$.next(true);

    this._guestService
      .create(this.getFormValue())
      .pipe(
        tap((guest) => {
          this.saved.emit(guest);
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `${guest.fullName} sauvegardé avec succès.`,
          });
        }),
        catchError((error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error });
          return EMPTY;
        }),
        finalize(() => this._saving$.next(false))
      )
      .subscribe();
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  private getFormValue(): Guest {
    const dto = this.form.getRawValue();

    return new Guest({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      invitedBy: dto.invitedBy.key,
      category: dto.category.key,
      brunchStatus: dto.brunchStatus.key,
      ceremonyStatus: dto.ceremonyStatus.key,
      cocktailStatus: dto.cocktailStatus.key,
      dinerStatus: dto.dinerStatus.key,
      plusOneId: dto.plusOneId && dto.plusOneId.id,
      parentId: dto.parentId && dto.parentId.id,
    });
  }
}

class AsyncValidators {
  public static uniqueGuest(
    guests$: Observable<Guest[]>,
    firstNamePropGetter: () => string,
    lastNamePropGetter: () => string,
    idPropGetter: () => string
  ): AsyncValidatorFn {
    return () => {
      const firstName = firstNamePropGetter();
      const lastName = lastNamePropGetter();

      return guests$.pipe(
        first(),
        map((guests) => guests.find((guest) => guest.isDuplicate(new Guest({ firstName, lastName })))),
        map((duplicate) => (duplicate && duplicate.id !== idPropGetter() ? { hasDuplicate: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
