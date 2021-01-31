// angular
import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NgModel } from '@angular/forms';

// app
import { Guest } from '@app/models';

@Component({
  selector: 'momo-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnChanges {
  @Input()
  public guest: Guest;

  @Output() onPrevious = new EventEmitter<void>();
  @Output() onSaved = new EventEmitter<Guest>();

  public email: string;

  @ViewChild('emailInput') private _emailInput: NgModel;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.guest) {
      this.email = this.guest && this.guest.email;

      if (this._emailInput) {
        setTimeout(() => {
          this._cdr.markForCheck();
        }, 0);
      }
    }
  }

  public previous(): void {
    this.onPrevious.emit();
  }

  public save(): void {
    this.onSaved.emit(new Guest({ ...this.guest, email: this.email }));
  }
}
