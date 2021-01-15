// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './i-environment';

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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
