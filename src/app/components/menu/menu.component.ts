// angular
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Router } from '@angular/router';

// firebase
import { AngularFireAuth } from '@angular/fire/auth';

// rxjs
import { from, Observable } from 'rxjs';

// app
import { MediaQueryService } from '@app/services';
import { AppRoute } from '@app/models';
import { SMALL_SCREEN_BREAKPOINT } from '@app/core/providers';

@Component({
  selector: 'momo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public AppRoutes: typeof AppRoute = AppRoute;
  public user$: Observable<any>;

  // public readonly faBars: typeof faBars = faBars;
  public readonly isSmallSscreen$: Observable<boolean>;

  public isMenuOpen: boolean = false;

  constructor(
    mediaService: MediaQueryService,
    private readonly _auth: AngularFireAuth,
    private readonly _router: Router,
    @Inject(SMALL_SCREEN_BREAKPOINT) smallScreenBreakpoint: number
  ) {
    this.isSmallSscreen$ = mediaService.match(`only screen and (max-width: ${smallScreenBreakpoint}px)`);
    this.user$ = this._auth.user;
  }

  public signOut(): void {
    from(this._auth.signOut()).subscribe(
      () => {
        this._router.navigate([`/${AppRoute.Login}`]);
      },
      (error) => {
        console.log(`[MenuComponent] Could not sign user out`, error);
      }
    );
  }
}
