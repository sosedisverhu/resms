const functions = require('firebase-functions');
const renderer = require('./.next/serverless/pages/[id]');

exports.render = functions.https.onRequest((request, response) => {
  request.firebase = require('firebase/app');

  require('firebase/auth');
  require('firebase/firestore');
  require('firebase/storage');

  if (!request.firebase.apps.length) {
    request.firebase.initializeApp({
      apiKey: 'AIzaSyBMZVlLDPPclixixJhLy-T5CyG8y93ddlA',
      authDomain: 'resms-production.firebaseapp.com',
      databaseURL: 'https://resms-production.firebaseio.com',
      projectId: 'resms-production',
      storageBucket: 'resms-production.appspot.com',
      messagingSenderId: '769694798495',
      appId: '1:769694798495:web:05297e736414a8efd288aa',
      measurementId: 'G-34PZWLDH16',
    });
  }

  renderer.render(request, response);
});
