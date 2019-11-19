import React, { useMemo } from 'react';
import Head from 'next/head';

import UAParser from 'ua-parser-js';
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';
import Router from '../routes';
import RouteContext from '../contexts/RouteContext';
import CampaingContext from '../contexts/CampaingContext';
import DisplayCampaignBlocks from '../components/DisplayCampaignBlocks';
import firebaseFromRequestWithFallback from '../helpers/firebase/firebaseFromRequestWithFallback';

const serialize = (value) => (isObject(value) ? mapValues(value, serialize) : (value || ''));

function CampaignPage({ route = {}, campaign = {} }) {
  const { title, image } = campaign;
  const campaignContext = useMemo(() => [campaign], [campaign]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
      </Head>

      <RouteContext.Provider value={route}>
        <CampaingContext.Provider value={campaignContext}>
          <DisplayCampaignBlocks />
        </CampaingContext.Provider>
      </RouteContext.Provider>
    </div>
  );
}

CampaignPage.getInitialProps = async ({ req }) => {
  if (!req.originalUrl) return {};

  const route = Router.match(req.originalUrl || '');

  const {
    params: { id },
  } = route;

  const firebase = firebaseFromRequestWithFallback(req);
  const firestore = firebase.firestore();
  const doc = await firestore
    .collection('campaigns')
    .doc(id)
    .get();

  const { id: activityId } = firestore.collection('campaigns').doc(id).collection('activities').doc();

  await firestore
    .collection('campaigns')
    .doc(id)
    .collection('activities')
    .doc(activityId)
    .set({
      trackedAt: +new Date(),
      userAgent: req.headers['user-agent'],
      ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
      ...mapValues(UAParser(req.headers['user-agent']), serialize),
    });

  const campaign = { id: doc.id, ...doc.data() };

  return { campaign, route };
};

export default CampaignPage;
