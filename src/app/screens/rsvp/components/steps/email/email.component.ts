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

// primeng
import { InputText } from 'primeng/inputtext';

// app
import { Guest } from '@app/models';
import { environment } from '@environment';

@Component({
  selector: 'momo-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss', '../step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnChanges {
  @Input() public guest: Guest;
  @Input() public isPlusOne: boolean;
  @Input() public isCurrentStep: boolean;
  @Output() public previous = new EventEmitter<void>();
  @Output() public next = new EventEmitter<Guest>();

  public email: string;

  @ViewChild(InputText) private _emailInput: InputText;

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

    if (this.isCurrentStep && this._emailInput) {
      setTimeout(() => this._emailInput.el.nativeElement.focus(), environment.rsvpTransitionDelay);
    }
  }

  public onPrevious(): void {
    this.previous.emit();
  }

  public onNext(): void {
    this.next.emit(new Guest({ ...this.guest, email: this.email }));
  }
}
