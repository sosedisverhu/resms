function firebaseFromRequestWithFallback(request) {
  let { firebase } = request;

  if (!firebase) {
    firebase = require('./ssr').default;

    if (!firebase.apps.length) {
      const firebaseConfig = require('./config').default;

      firebase.initializeApp(firebaseConfig);
    }
  }

  return firebase;
}

export default firebaseFromRequestWithFallback;
