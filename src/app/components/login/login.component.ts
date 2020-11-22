// angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// firebase
import { AngularFireAuth } from '@angular/fire/auth';

// rxjs
import { BehaviorSubject, from } from 'rxjs';

// app
import { AppRoute, AuthErrorCode } from '@app/models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'momo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public submitting$: BehaviorSubject<boolean>;
  public AuthErrorCode: typeof AuthErrorCode = AuthErrorCode;

  private _submitted: boolean;

  constructor(
    private readonly _auth: AngularFireAuth,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  public ngOnInit(): void {}

  public signIn(): void {
    if (this.form.valid) {
      this.submitting$.next(true);
      this._submitted = true;
      from(this._auth.signInWithEmailAndPassword(this.emailControl.value, this.passwordControl.value)).subscribe(
        (user) => {
          const redirectTo = this._route.snapshot.queryParams['redirectTo'] || `/${AppRoute.Admin}`;

          console.info(`[LoginComponent] User ${user.user.email} signed in`);
          console.info(`[LoginComponent] User redirected to "${redirectTo}"`);

          this._router.navigate([redirectTo]);

          this.submitting$.next(false);
        },
        ({ code, message }) => {
          // dispatch the errors to the proper formControl
          switch (code) {
            case AuthErrorCode.UserDisabled:
            case AuthErrorCode.UserNotFound:
              this.emailControl.setErrors({
                auth: message,
              });
              break;
            case AuthErrorCode.WrongPassword:
              this.passwordControl.setErrors({
                auth: message,
              });
              break;
            default:
              // do not display too specific error on screen
              console.error(`[LoginComponent] Error while signing user in`, code, message);
              break;
          }

          this.submitting$.next(false);
          this._cdr.detectChanges();
        }
      );
    }
  }

  public getErrors(control: FormControl): string[] {
    if (this._submitted && control.invalid) {
      return Object.keys(control.errors).map((errorCode) => {
        switch (errorCode) {
          case 'required':
            return `Field is required`;
          case 'email':
            return `Value is not a proper formated email`;
          case 'auth':
            return control.getError(errorCode).message;
            break;
          default:
            break;
        }
      });
    }
  }

  private initForm(): void {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', Validators.required);
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });

    this.submitting$ = new BehaviorSubject(false);
  }
}
