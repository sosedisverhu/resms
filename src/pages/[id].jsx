import React, { useMemo } from 'react';
import Head from 'next/head';

import Router from '../routes';
import RouteContext from '../contexts/RouteContext';
import CampaingContext from '../contexts/CampaingContext';
import ReadOnlyCampaignBlocks from '../components/ReadOnlyCampaignBlocks';
import firebaseFromRequestWithFallback from '../helpers/firebase/firebaseFromRequestWithFallback';

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
          <ReadOnlyCampaignBlocks />
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

  const campaign = { id: doc.id, ...doc.data() };

  return { campaign, route };
};

export default CampaignPage;
