// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

// app
import { GuestService } from '@app/services';
import { environment, KeyAddresses, SIGNED_IN_GUEST_KEY } from '@environment';
import { InviteStatus } from '@app/models';

@Component({
  selector: 'momo-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent implements OnInit {
  public keyAdresses: KeyAddresses = environment.keyAdresses;
  public displayBrunch$: Observable<boolean>;

  constructor(guestService: GuestService) {
    const guestId = window.localStorage.getItem(SIGNED_IN_GUEST_KEY);
    this.displayBrunch$ = guestId
      ? guestService.get(guestId).pipe(
          first(),
          map((guest) => guest.brunchStatus !== InviteStatus.NotInvited)
        )
      : of(false);
  }

  ngOnInit(): void {}
}
