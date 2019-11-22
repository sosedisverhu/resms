import UAParser from 'ua-parser-js';
import mapValues from 'lodash/mapValues';
import next from 'next';
import express from 'express';
import serialize from './utils/serialize';
import firebaseFromRequestWithFallback from './helpers/firebase/firebaseFromRequestWithFallback';

import routes from './routes';

const OKEY_STATUS_CODE = 200;
const NOT_FOUND_STATUS_CODE = 404;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {
  express()
    .use(express.static('public'))
    .get('/images/:id', async (req, res) => {
      const { id } = req.params;
      const firebase = firebaseFromRequestWithFallback(req);
      const firestore = firebase.firestore();

      const doc = await firestore
        .collection('campaigns')
        .doc(id)
        .get();

      const data = doc.data();

      if (data) {
        await firestore
          .collection('campaigns')
          .doc(id)
          .collection('activities')
          .add({
            trackedAt: +new Date(),
            userAgent: req.headers['user-agent'],
            ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
            ...mapValues(UAParser(req.headers['user-agent']), serialize),
            type: 'preview',
          });

        res.status(OKEY_STATUS_CODE).send(data.image);
      } else {
        res.status(NOT_FOUND_STATUS_CODE).end();
      }
    })
    .use(handler)
    .listen(3000);
});
