// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment, KEY_ADDRESSES, LYDIA_LINK, RSVP_TRANSITION_DELAY, SMALLSCREEN_WIDTH_BREAKPOINT } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  useEmulators: true,
  adminBaseApi: 'http://localhost:5001/momaud-wedding/europe-west1/app',
  firebase: {
    apiKey: 'AIzaSyC-chbvja-gaRcFxn58lcxYEMNSqxy_l74',
    authDomain: 'momaud-wedding.firebaseapp.com',
    databaseURL: 'https://momaud-wedding.firebaseio.com',
    projectId: 'momaud-wedding',
    storageBucket: 'momaud-wedding.appspot.com',
    messagingSenderId: '685334831807',
    appId: '1:685334831807:web:57cc93d8aa06fdae341c0a',
    measurementId: 'G-QW2NJ4QZL9',
  },
  smallScreenBreakpoint: SMALLSCREEN_WIDTH_BREAKPOINT,
  rsvpTransitionDelay: RSVP_TRANSITION_DELAY,
  keyAdresses: KEY_ADDRESSES,
  lydiaLink: LYDIA_LINK,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
