// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebaseApiKey } from 'src/app/keys/firebase.keys';

export const environment = {
  production: false,
  firebase: {
      apiKey: firebaseApiKey,
      authDomain: "watch-4-movies.firebaseapp.com",
      databaseURL: "https://watch-4-movies.firebaseio.com",
      projectId: "watch-4-movies",
      storageBucket: "watch-4-movies.appspot.com",
      messagingSenderId: "576751665895",
      appId: "1:576751665895:web:dd9342589edd3530a85842",
      measurementId: "G-Z0B529NM9X"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
