// firebase
import * as admin from 'firebase-admin';

// local
import { HttpApp } from './http-app';
import { UserModule } from './user-module';

// main
admin.initializeApp();

exports.app = new HttpApp()
  .attach(new UserModule('user')) // http://localhost:5001/momaud-wedding/europe-west1/app/user
  .export();
