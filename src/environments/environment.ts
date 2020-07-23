import { firebaseApiKey } from 'src/app/keys/firebase.keys';

export const environment = {
  production: false,
  firebaseConfig: {
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
