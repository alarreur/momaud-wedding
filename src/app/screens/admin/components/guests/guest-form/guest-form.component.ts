// angular
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

// primeng
import { MessageService, SelectItem } from 'primeng/api';

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

  @ViewChild('firstName', { static: false })
  public firstNameInput: ElementRef;

  public form: FormGroup;

  public inviteStatuses: SelectItem[] = Object.keys(InviteStatus)
    .filter((key) => ['toString', 'getIcon'].indexOf(key) < 0)
    .map((key) => (InviteStatus as any)[key])
    .map((value: InviteStatus) => ({
      value,
      label: InviteStatus.toString(value),
      icon: InviteStatus.getIcon(value),
    }));

  public categories: SelectItem[] = Object.keys(GuestCategory)
    .filter((key) => key !== 'toString')
    .map((key) => (GuestCategory as any)[key])
    .map((value: GuestCategory) => ({
      value,
      label: GuestCategory.toString(value),
    }));

  public hosts: SelectItem[] = Object.keys(Host)
    .filter((key) => key !== 'toString')
    .map((key) => (Host as any)[key])
    .map((value: Host) => ({
      value,
      label: Host.toString(value),
    }));

  public guestsSuggestions$: Observable<Guest[]>;
  public searchGuest$: Subject<string> = new Subject();
  public cannotSave$: Observable<boolean>;

  private _saving$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly _guestService: GuestService, private messageService: MessageService) {
    this.guestsSuggestions$ = this.searchGuest$.pipe(
      debounceTime(300),
      switchMap((searchTerm) => _guestService.search(searchTerm))
    );
  }

  public ngOnInit(): void {
    this.createForm();
    this.updateForm();

    this.cannotSave$ = combineLatest([
      this._saving$,
      this.form.valueChanges.pipe(
        map(() => this.form.invalid),
        startWith(this.form.invalid)
      ),
    ]).pipe(map(([saving, invalid]) => saving || invalid));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes.guest) {
      this.updateForm();
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
          default:
            break;
        }
      });
    }
  }

  public save(): void {
    this._saving$.next(true);
    const upsert = this.guest ? this._guestService.update(this.getFormValue()) : this._guestService.create(this.getFormValue());
    upsert
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

  public createForm(): void {
    const defaultInvitedStatus = InviteStatus.Invited;

    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(
        null,
        null,
        AsyncValidators.uniqueGuest(
          this._guestService.list(),
          () => this.form && this.form.get('firstName').value,
          () => this.form && this.form.get('lastName').value,
          () => this.guest && this.guest.id
        )
      ),
      email: new FormControl(null, Validators.email),
      category: new FormControl(null, Validators.required),
      invitedBy: new FormControl(null, Validators.required),
      ceremonyStatus: new FormControl(defaultInvitedStatus, Validators.required),
      cocktailStatus: new FormControl(defaultInvitedStatus, Validators.required),
      dinerStatus: new FormControl(defaultInvitedStatus, Validators.required),
      brunchStatus: new FormControl(defaultInvitedStatus, Validators.required),
      plusOneId: new FormControl(),
      parentId: new FormControl(),
    });
  }

  public updateForm(): void {
    if (this.guest) {
      this._guestService
        .list()
        .pipe(
          first(),
          tap((guests) => {
            const {
              firstName,
              lastName,
              email,
              category,
              invitedBy,
              ceremonyStatus,
              cocktailStatus,
              dinerStatus,
              brunchStatus,
              plusOneId,
              parentId,
            } = this.guest;
            this.form.patchValue({
              firstName,
              lastName,
              email,
              category,
              invitedBy,
              ceremonyStatus,
              cocktailStatus,
              dinerStatus,
              brunchStatus,
              plusOneId: plusOneId && guests.find((guest) => guest.id === plusOneId),
              parentId: parentId && guests.find((guest) => guest.id === parentId),
            });
          })
        )
        .subscribe();
    }
  }

  private getFormValue(): Guest {
    const dto = this.form.getRawValue();

    return new Guest({
      id: this.guest && this.guest.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      invitedBy: dto.invitedBy,
      category: dto.category,
      brunchStatus: dto.brunchStatus,
      ceremonyStatus: dto.ceremonyStatus,
      cocktailStatus: dto.cocktailStatus,
      dinerStatus: dto.dinerStatus,
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
