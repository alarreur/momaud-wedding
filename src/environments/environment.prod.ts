import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  useEmulators: false,
  adminBaseApi: '/todo',
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
