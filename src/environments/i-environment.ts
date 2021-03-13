export const SMALLSCREEN_WIDTH_BREAKPOINT = 801;
export const RSVP_TRANSITION_DELAY = 1000;
export const LYDIA_LINK = 'https://lydia-app.com/collect/29103-lune-de-miel/fr';
export const SIGNED_IN_GUEST_KEY = 'signedInGuestId';

export const KEY_ADDRESSES: KeyAddresses = {
  church: 'https://goo.gl/maps/uHiWUUZr2resiPwH6',
  sainteAnne: 'https://goo.gl/maps/QhPcdu8yPiWHC3f17',
  avignonTgv: 'https://goo.gl/maps/dTXJUicPZbD1GzZHA',
};

export interface IEnvironment {
  production: boolean;
  useEmulators: boolean;
  firebase: any;
  adminBaseApi: string;
  smallScreenBreakpoint: number;
  rsvpTransitionDelay: number;
  keyAdresses: KeyAddresses;
  lydiaLink: string;
}

export interface KeyAddresses {
  church: string;
  sainteAnne: string;
  avignonTgv: string;
}
