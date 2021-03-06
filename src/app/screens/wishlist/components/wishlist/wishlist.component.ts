// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// app
import { environment } from '@environment';

@Component({
  selector: 'momo-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  public lydiaLink = environment.lydiaLink;

  constructor() {}

  ngOnInit(): void {}
}
