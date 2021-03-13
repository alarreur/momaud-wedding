# MomaudWedding

This project is the wedding website of M&A. It features:

- the administration of guests
- a RSVP section for guests
- a Program section
- a useful information section
- a link to a Lydia prizepool, acting as the wedding wishlist

This project is developped with the following front-end and back-end technical stack: Angular 10, Firebase, NgFire and NgRx

## Data & Restrictions

The Administration section is only available to logged in users. The creation and deletion of guests is restricted to users having the admin token only. Anyone can update a guest (to enable guests to RSVP).

The CRUD operations are managed with Firestore Rules available in file `firestore.rules`. More information on how to manage those rules is available on the [Firebase Security Rules documentation](https://firebase.google.com/docs/rules).

## Launch the application

1. Run the firebase emulators: `npm run emulators:start`. The eumulators GUI is available on http://localhost:4000. Mock data are loaded from folder `/emulators-data`. Once emulator is running, if you want to save new data, run `emulators:save`.
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. To have your local project use emulated data, make sure flag `environment.useEmulators` is `true`.

## Continuous Delivery

For every Pull Request that is created, Github triggers an action to deploy the the PR on a dedicated Firebase Preview Channel. This can be administrated in the Hosting section of the Firebase Console. Please refer do [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting/github-integration) for mor information.

To deploy to production, you can either :

- deploy a Firebase Preview Channel from the Firebase Console; or
- make a Pull Request on the Github `prod` branch and merge it

To deploy the Firestore Rules, please run `firebase deploy --only firestore:rules`

## Firebase Functions

The section to manage users and to promote them as administrators is not completed as secure backend APIs were needed to perform those operations.
Firebase Functions were used to write those APIs (folder `functions/src/`). Unfortunately the running of these functions is a paid feature of Firebase. I chose not to deploy them although the work on the API is done. Locally the API is available here: http://localhost:5001/momaud-wedding/europe-west1/app/user

The administration of users can be managed directly in the `Firebase Console` > `Authentication` section.
