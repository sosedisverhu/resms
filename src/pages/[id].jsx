import React, { useMemo, useEffect } from 'react';
import Head from 'next/head';

import UAParser from 'ua-parser-js';
import mapValues from 'lodash/mapValues';
import Router from '../routes';
import RouteContext from '../contexts/RouteContext';
import CampaingContext from '../contexts/CampaingContext';
import DisplayCampaignBlocks from '../components/DisplayCampaignBlocks';
import firebaseFromRequestWithFallback from '../helpers/firebase/firebaseFromRequestWithFallback';
import serialize from '../utils/serialize';
import { firestore } from '../helpers/firebase';

function CampaignPage({ route = {}, campaign = {}, user = {} }) {
  const { title, image } = campaign;
  const campaignContext = useMemo(() => [campaign], [campaign]);

  useEffect(async () => {
    if (campaign.id) {
      await firestore
        .collection('campaigns')
        .doc(campaign.id)
        .collection('activities')
        .add({
          trackedAt: +new Date(),
          userAgent: user.userAgent,
          ip: user.ip,
          ...mapValues(UAParser(user.userAgent), serialize),
          type: 'view',
        });
    }
  }, []);

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
  const doc = await firebase.firestore()
    .collection('campaigns')
    .doc(id)
    .get();

  const campaign = { id: doc.id, ...doc.data() };

  return {
    campaign,
    route,
    user: {
      userAgent: req.headers['user-agent'],
      ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
    },
  };
};

export default CampaignPage;
